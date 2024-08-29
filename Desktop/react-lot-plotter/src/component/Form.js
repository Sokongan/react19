import React, { useState, useEffect, useRef } from 'react';
import { getRequest } from '../api/config';
import SelectForm from '../component/react-select'


const PlotForm = ({ isMinimized, isShown, handleClose, onFormSubmit }) => {

  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(''); 

  const [municipalities, setMunicipalities] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState('');

  const [tiePoints, setTiePoints] = useState([]);
  const [selectedTiePoint, setSelectedTiePoint] = useState('');

  const [provinceMenuIsOpen, setProvinceMenuIsOpen] = useState(false);
  const [municipalityMenuIsOpen, setMunicipalityMenuIsOpen] = useState(false);
  const [tiePointMenuIsOpen, setTiePointMenuIsOpen] = useState(false);

  const provinceInputRef = useRef(null);
  const municipalityInputRef = useRef(null);
  const tiePointInputRef = useRef(null);

  const handleProvinceClick = () => {
    setProvinceMenuIsOpen(prevOpen => !prevOpen);
    if (!provinceMenuIsOpen && provinceInputRef.current) {
      provinceInputRef.current.focus();
    }
  };

  const handleMunicipalityClick = () => {
    setMunicipalityMenuIsOpen(prevOpen => !prevOpen);
    if (!municipalityMenuIsOpen && municipalityInputRef.current) {
      municipalityInputRef.current.focus();
    }
  };

  const handleTiePointClick = () => {
    setTiePointMenuIsOpen(prevOpen => !prevOpen);
    if (!tiePointMenuIsOpen && tiePointInputRef.current) {
      tiePointInputRef.current.focus();
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getRequest('provinces');
        const formattedProvinces = response.data.map(i => ({
          value: i,
          label: i,
        }));
        setProvinces(formattedProvinces);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    }
    fetchData();
  }, []);

  const handleProvinceChange = async (selectedOption) => {
    setProvinceMenuIsOpen(false);
    setSelectedProvince(selectedOption); 
    try {
      const response = await getRequest(`/municipalities?province=${selectedOption.value}`);
      setMunicipalities(response.data.map(i => ({
        value: i,
        label: i,
      })));
    } catch (error) {
      console.error('Error fetching municipalities:', error);
    }
  };

  const handleMunicipalityChange = async (selectedOption) => {
    setMunicipalityMenuIsOpen(false);
    setSelectedMunicipality(selectedOption); 
    try {
      const tiePointResponse = await getRequest(`/?search&provinces=`+selectedProvince+`&municipality=`+selectedOption.value);
      setTiePoints(tiePointResponse.data.map(tiePoint => ({
        value: tiePoint.id,
        label: tiePoint.tie_pt_name,
      })));
    } catch (error) {
      console.error('Error fetching tie points:', error);
    }
  };
  
const handleTiePointChange = async (selectedOption) => {
  setTiePointMenuIsOpen(false);
  setSelectedTiePoint(selectedOption);

  try {
    const response = await getRequest(`/${selectedOption.value}`);
    onFormSubmit(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


// base corner tiepoint
const [corner, setCorner] = useState(1);
const [bearingDistances, setBearingDistances] = useState([]);
const [errors, setErrors] = useState({});

const validateField = (field, value) => {
  let error = '';

  const isNumber = (val) => /^\d+$/.test(val); // This regex checks if the value is numeric

  switch (field) {
    case 'ns':
      if (!['N', 'S'].includes(value.toUpperCase())) {
        error = 'Must be N or S';
      }
      break;
    case 'ew':
      if (!['E', 'W'].includes(value.toUpperCase())) {
        error = 'Must be E or W';
      }
      break;
    case 'deg':
      if (!isNumber(value) || isNaN(value) || value < 0 || value > 179) {
        error = 'Degree must be a number between 0 and 179';
      }
      break;
    case 'min':
      if (!isNumber(value) || isNaN(value) || value < 0 || value > 59) {
        error = 'Minutes must be a number between 0 and 59';
      }
      break;
    case 'distance':
      if (!isNumber(value) || isNaN(value) || value <= 0) {
        error = 'Distance must be a positive number';
      }
      break;
    default:
      break;
  }

  return error;
};

const handleBeforeInput = (event, field) => {
  const char = event.data;

  // Allow control characters such as backspace and delete
  if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward') {
    return; // Allow delete and backspace operations
  }

  switch (field) {
    case 'ns':
      // Allow only 'N' or 'S' for 'ns' field
      if (!/^[NS]$/i.test(char)) {
        event.preventDefault();
      }
      break;

    case 'ew':
      // Allow only 'E' or 'W' for 'ew' field
      if (!/^[EW]$/i.test(char)) {
        event.preventDefault();
      }
      break;

    case 'distance':
      // Allow numbers and '.' for distance field
      if (!/^[0-9.]$/.test(char)) {
        event.preventDefault();
      }
      break;

    case 'deg':
      // Allow numbers and '.' for degrees field, limiting to 0-180
      if (!/^[0-9.]$/.test(char) || (field.length > 0 && parseInt(field) > 180)) {
        event.preventDefault();
      }
      break;

    case 'min':
      // Allow numbers and '.' for minutes field, limiting to 0-59
      if (!/^[0-9.]$/.test(char) || (field.length > 0 && parseInt(field) > 59)) {
        event.preventDefault();
      }
      break;

    default:
      event.preventDefault()
      break;
  }
};


const handleAddCorner = () => {
  // Get the last set of bearing distances
  const latestSet = bearingDistances[bearingDistances.length - 1];
  if (latestSet && (latestSet.ns === '' || latestSet.deg === '' || latestSet.min === '' || latestSet.ew === '' || latestSet.distance === '')) {
    // Display an alert to the user
    alert('Please fill in all fields for the current corner before adding a new corner.');
    return; // Exit the function if the condition is not met
  }

  let newCornerValue;
  if (corner === 1) {
    newCornerValue = `Tie Point to Corner ${corner}`;
  } else {
    newCornerValue = `Corner ${corner - 1} to Corner ${corner}`;
  }

  // Add a new corner to the list
  setBearingDistances([...bearingDistances, { corner: newCornerValue, ns: '', deg: '', min: '', ew: '', distance: '' }]);
  setCorner(corner + 1); // Increment the corner count when a new tie point is added
};


const handleBearingChange = (index, field, value) => {
  const updatedBearingDistances = [...bearingDistances];
  const fieldError = validateField(field, value);

  updatedBearingDistances[index][field] = value;
  
  if (fieldError) {
    setErrors({ ...errors, [`${index}-${field}`]: fieldError });
  } else {
    const newErrors = { ...errors };
    delete newErrors[`${index}-${field}`];
    setErrors(newErrors);
  }

  // If no errors, calculate azimuth
  if (!fieldError) {
    const { ns, deg, min, ew } = updatedBearingDistances[index];
    const azimuth = calculateAzimuth(ns, deg, min, ew);
    updatedBearingDistances[index].bearing = azimuth;
  }

  setBearingDistances(updatedBearingDistances);
};

const handleDistanceChange = (index, value) => {
  const updatedBearingDistances = [...bearingDistances];
  const distanceError = validateField('distance', value);

  updatedBearingDistances[index].distance = value;

  if (distanceError) {
    setErrors({ ...errors, [`${index}-distance`]: distanceError }); 
  } else {
    const newErrors = { ...errors };
    delete newErrors[`${index}-distance`];
    setErrors(newErrors);
  }

  setBearingDistances(updatedBearingDistances);
};


const handleRemoveTiePoint = (index) => {
  const updatedBearingDistances = bearingDistances.filter((_, i) => i !== index);
  setBearingDistances(updatedBearingDistances);
  setCorner(corner - 1); // Decrement the corner count when a tie point is removed
};

const calculateAzimuth = (ns, deg, min, ew) => {
  // Implement azimuth calculation logic here
  // This is just a placeholder formula
  return `${ns}${deg}°${min}'${ew}`;
};

 
  return (
    <div className={`custom-dialog`} style={{ display: isShown ? 'block' : 'none' }}>
      <div className="custom-dialog-header">
        <h2>Lot Plotter</h2>
        <div className='custom-dialog-close'>
          <i className="bi bi-x custom-btn" onClick={handleClose}></i>
        </div>
      </div>
      <div className="custom-dialog-body" style={{ display: isMinimized ? 'none' : 'block' }}>
        <form className={`select-tie-point form-row row`}>
          <div className='form-row mt-2 p-2 col-8 border '>
            <div className="col-12 mb-4">
              <div className="col-12 mb-2 form-group">
                    <label htmlFor="province" className="form-label">Province</label>
                      <SelectForm 
                      optionValue={provinces}
                      selectedValue={selectedProvince}
                      onChangeEvent={handleProvinceChange}
                      clickEvent={handleProvinceClick}
                      inputRef={provinceInputRef} 
                      menuState={provinceMenuIsOpen}
                      placeHolder={'Select Province'}
                      />  
              </div>
              <div className="col-12 mb-2">
                  <label htmlFor="province" className="form-label">Municipality</label>
                      <SelectForm 
                    optionValue={municipalities}
                    selectedValue={selectedMunicipality}
                    onChangeEvent={handleMunicipalityChange}
                    clickEvent={handleMunicipalityClick}
                    inputRef={municipalityInputRef} 
                    placeHolder={'Select Municipality'}
                    menuState={municipalityMenuIsOpen}
                   />
              </div>
              <div className="col-12 mb-2">
                  <label htmlFor="province" className="form-label">Tie Point</label>
                    <SelectForm 
                  optionValue={tiePoints}
                  selectedValue={selectedTiePoint}
                  onChangeEvent={handleTiePointChange}
                  clickEvent={handleTiePointClick}
                  inputRef={tiePointInputRef} 
                  placeHolder={'Select Tie Point'}
                  menuState={tiePointMenuIsOpen}
                  />
              </div>
            </div>
          </div>
          <div className='form-row mt-2 p-2 col border'>
            <div className="row">
              <div className="">
                <label htmlFor="csvFile" className="form-label">Upload a CSV formatted file (click to view format):</label>
                <input type="file" className="form-control" id="csvFile" />
              </div>
              <div className='mt-2 row p-2 m-1'>
                <div className="form-check col m-2">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Display generated area
                  </label>
                </div>
                <div className="col-md-auto m-2">
                  <button type="button" className="btn btn-warning btn-sm">Upload</button>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-2 p-2 border ' style={{ maxHeight: '250px', overflowY: 'auto' }}>
            <label>Input bearing and distances</label>
            <div className='container'>
            <div >
            {bearingDistances.map((bd, index) => (
      <div key={index} className={`tie-point-bg`}>
        <div className="container border text-center p-3">
          <div className="row g-2">
            <div className="col">
              <div className="p-2">Corner</div>
            </div>
            <div className="col">
              <div className="p-2">NS</div>
            </div>
            <div className="col">
              <div className="p-2">Deg</div>
            </div>
            <div className="col">
              <div className="p-2">Min</div>
            </div>
            <div className="col">
              <div className="p-2">EW</div>
            </div>
            <div className="col">
              <div className="p-2">Distance (m)</div>
            </div>
            <div className="col">
              <div className="p-2">Action</div>
            </div>
          </div>
          <div className="row g-2">
            <div className="col border">
              <div className="p-2">{bd.corner}</div>
            </div>
            <div className="col border">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="N/S"
                  className="form-control text-center"
                  value={bd.ns}
                  onChange={(e) => handleBearingChange(index, 'ns', e.target.value)}
                  onBeforeInput={(event) => handleBeforeInput(event, 'ns')}
                />
                {errors[`${index}-ns`] && <small className="text-danger text-wrap">{errors[`${index}-ns`]}</small>}
              </div>
            </div>
            <div className="col border">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Deg"
                  className="form-control text-center"
                  value={bd.deg}
                  onChange={(e) => handleBearingChange(index, 'deg', e.target.value)}
                  onBeforeInput={(event) => handleBeforeInput(event, 'deg')}
                 
                />
                {errors[`${index}-deg`] && <small className="text-danger text-wrap">{errors[`${index}-deg`]}</small>}
              </div>
            </div>
            <div className="col border">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Min"
                  className="form-control text-center"
                  value={bd.min}
                  onChange={(e) => handleBearingChange(index, 'min', e.target.value)}
                  onBeforeInput={(event) => handleBeforeInput(event, 'min')}
                />
                {errors[`${index}-min`] && <small className="text-danger text-wrap">{errors[`${index}-min`]}</small>}
              </div>
            </div>
            <div className="col border">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="E/W"
                  className="form-control text-center"
                  value={bd.ew}
                  onChange={(e) => handleBearingChange(index, 'ew', e.target.value)}
                  onBeforeInput={(event) => handleBeforeInput(event, 'ew')}
                />
                {errors[`${index}-ew`] && <small className="text-danger text-wrap">{errors[`${index}-ew`]}</small>}
              </div>
            </div>
            <div className="col-2 border">
              <div className="p-2 g-col-2">
                <input
                  type="text"
                  placeholder="Distance (m)"
                  className="form-control text-center"
                  value={bd.distance}
                  onChange={(e) => handleDistanceChange(index, e.target.value)}
                  onBeforeInput={(event) => handleBeforeInput(event, 'distance')}
                />
                {errors[`${index}-distance`] && <small className="text-danger text-wrap">{errors[`${index}-distance`]}</small>}
              </div>
            </div>
            <div className="col border">
              <div className="p-2">
                <i className="bi bi-x btn-danger btn btn-sm mt-1" onClick={() => handleRemoveTiePoint(index)}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
              <div className='col-10 relative'>
                <button type="button" className='btn btn-success m-2' onClick={handleAddCorner}>Add Corner</button>
              </div>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-2'>
              <button type="button" className='btn btn-primary m-2' onClick={handleAddCorner}>New</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlotForm;
