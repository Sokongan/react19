import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PlotForm from './Form';

const Controls = () => {
  const map = useMap();
  const [showDialog, setShowDialog] = useState(false);
  const [isMinimized,] = useState(false);


  const handleClose = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    const LotPlotter = L.control({ position: 'topleft' });

    LotPlotter.onAdd = function () {
      const div = L.DomUtil.create('div');
      div.style.paddingTop = '20px';
    
      div.style.paddingBottom = '10px';

      const root = ReactDOM.createRoot(div);
      root.render(
        <>
          <button className="btn btn-warning" onClick={() => setShowDialog(!showDialog)}>
            {showDialog && !isMinimized ? (
              <i className="bi bi-dash-circle"></i>
            ) : (
              <i className="bi bi-plus-circle"></i>
            )} Lot Plotter
          </button>
          {showDialog && (
            <PlotForm
              isMinimized={isMinimized}
              isShown={showDialog}
              handleClose={handleClose}
            />
          )}
        </>
      );

      return div;
    };

    LotPlotter.addTo(map);

    return () => {
      LotPlotter.remove();
    };
  }, [map, showDialog, isMinimized]);

  return null;
};

export default Controls;
