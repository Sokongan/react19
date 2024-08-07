import React, { useState } from 'react';

const PlotForm = ({ isMinimized, handleMinimize, isShown, handleClose }) => {
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

  return (
    <div className={`custom-dialog`} style={{ display: isShown ? 'block' : 'none' }}>
      <div className="custom-dialog-header">
        <h2>Plot</h2>
        <button onClick={handleClose}>Close</button>
      </div>
      <div className="custom-dialog-body" style={{ display: isMinimized ? 'none' : 'block' }}>
        <form className='card p-3 bg-light'>
          <div className='form-row p-2 border'>
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
                <label className="form-check-label" htmlFor="displayAreaLabel">Display generated area label</label>
              </div>
              <div className="">
                <button type="button" className="btn btn-primary">Upload File</button>
              </div>
            </div>
          </div>
          <div className='mt-2 p-2 border'>
            <label>Input bearing and distances</label>
            <div className='container'>
              <div>
                {bearingDistances.map((bd, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      placeholder="Bearing"
                      value={bd.bearing}
                      onChange={(e) => handleBearingChange(index, e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Distance"
                      value={bd.distance}
                      onChange={(e) => handleDistanceChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col-10'>
              <button className='btn btn-primary m-2' onClick={handleAddCorner}>Add Corner</button>
            </div>
            <div className='col-2'>
              <button className='btn btn-primary' onClick={handleAddCorner}>New</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlotForm;
