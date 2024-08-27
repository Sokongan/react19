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
  

  const [bearingDistances, setBearingDistances] = useState([]);



  const handleAddCorner = () => {
    setBearingDistances([...bearingDistances, { bearing: '', distance: '' }]);
  };

  const handleBearingChange = (index, value) => {
    const updatedBearingDistances = [...bearingDistances];
    updatedBearingDistances[index].bearing = value;
    setBearingDistances(updatedBearingDistances);
  };

  const handleDistanceChange = (index, value) => {
    const updatedBearingDistances = [...bearingDistances];
    updatedBearingDistances[index].distance = value;
    setBearingDistances(updatedBearingDistances);
  };

  const handleRemoveTiePoint = (index) => {
    const updatedBearingDistances = bearingDistances.filter((_, i) => i !== index);
    setBearingDistances(updatedBearingDistances);
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
               <div>
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
          <div className='mt-2 p-2 border'>
            <label>Input bearing and distances</label>
            <div className='container'>
              <div>
                {bearingDistances.map((bd, index) => (
                  <div key={index} className={`tie-point-bg`}>
                    <div className="container text-center border">
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
                        <div className="col">
                          <div className="p-2"></div>
                        </div>
                        <div className="col">
                          <div className="p-2">
                            <input type="text" placeholder="N/S" className="form-control"
                              value={bd.bearing}
                              onChange={(e) => handleBearingChange(index, e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="p-2">
                            <input type="text" placeholder="Deg" className="form-control"
                              value={bd.bearing}
                              onChange={(e) => handleBearingChange(index, e.target.value)} />
                          </div>
                        </div>
                        <div className="col">
                          <div className="p-2">
                            <input type="text" placeholder="Min" className="form-control"
                              value={bd.bearing}
                              onChange={(e) => handleBearingChange(index, e.target.value)} />
                          </div>
                        </div>
                        <div className="col">
                          <div className="p-2">
                            <input type="text" placeholder="E/W" className="form-control"
                              value={bd.distance}
                              onChange={(e) => handleDistanceChange(index, e.target.value)} />
                          </div>
                        </div>
                        <div className="col">
                          <div className="p-2">
                            <input type="text" placeholder="Distance (m)" className="form-control"
                              value={bd.distance}
                              onChange={(e) => handleDistanceChange(index, e.target.value)} />
                          </div>
                        </div>
                        <div className="col">
                          <div className="p-2">
                            <i className="bi bi-x btn-danger btn btn-sm" onClick={() => handleRemoveTiePoint(index)}></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='col-10'>
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
