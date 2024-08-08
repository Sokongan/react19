import React, { useState } from 'react';

const PlotForm = ({ isMinimized, isShown, handleClose }) => {
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
        <h2>Plot</h2>
        <i className="bi bi-x btn-danger btn btn-sm  " onClick={handleClose}></i>
      </div>
      <div className="custom-dialog-body" style={{ display: isMinimized ? 'none' : 'block' }}>
        <form className={`select-tie-point form-row`}>
          <div className='form-row mt-2 p-2 border'>
            <div className="row mb-4">
              <div className="col-4 form-group">
                <label htmlFor="province" className="form-label">Province</label>
                <select className="form-select" id="province">
                  <option value="">Select Province</option>
                </select>
              </div>
              <div className="col-4">
                <label htmlFor="municipality" className="form-label">Municipality</label>
                <select className="form-select" id="municipality">
                  <option value="">Select Municipality</option>
                </select>
              </div>
              <div className="col-4">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" />
              </div>
            </div>
          </div>
          <div className='form-row mt-2 p-2 border'>
            <div className="row">
              <div className="mb-3">
                <label htmlFor="csvFile" className="form-label">Upload a CSV formatted file (click to view format):</label>
                <input type="file" className="form-control" id="csvFile" />
              </div>
              <div className="">
                <input type="checkbox" className="form-check-input" id="displayAreaLabel" />
                <label className="form-check-label" htmlFor="displayAreaLabel"> Display generated area label</label>
              </div>
              <div className="">
                <button type="button" className="btn btn-warning">Upload File</button>
              </div>
            </div>
          </div>
          <div className='mt-2 p-2 border'>
            <label>Input bearing and distances</label>
            <div className='container'>
              <div>
                {bearingDistances.map((bd, index) => (
                  <div key={index} className={`tie-point-bg`}>
                    <div className="container text-center">
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
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-10'>
              <button type="button" className='btn btn-success m-2' onClick={handleAddCorner}>Add Corner</button>
            </div>
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
