import React from "react";
import i18next from "i18next";
import Dropdown from 'react-bootstrap/Dropdown';
const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  ar: { label: "العربية", dir: "rtl", active: false },
  hi: { label: "हिंदी", dir: "ltr", active: false },
  ch: { label: "中文 ", dir: "ltr", active: false },
};

const LanguageDropdown = () => {
  const selected = localStorage.getItem("i18nextLng") || "en";
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  React.useEffect(() => {
    document.body.dir = languageMap[selected].dir;
  }, [menuAnchor, selected]);
  const handleSelect=(e)=>{
    console.log(e);
    i18next.changeLanguage(e)
    
  }
  return (
    <>
      
      <Dropdown  onSelect={handleSelect}>
        <Dropdown.Toggle variant="none" >
        {/* className="text-light font-weight-bold" */}
          {/* Select language */}
        </Dropdown.Toggle>
        <Dropdown.Menu>
        {Object.keys(languageMap).map((item, index) => (
          <Dropdown.Item eventKey={item}>{languageMap[item].label}</Dropdown.Item>
        ))}
      
        </Dropdown.Menu>
      </Dropdown>
  
          
        {/* <div className="dropdown dropdown-primary">
          <button
            type="button"
            className="btn btn-icon btn-soft-light dropdown-toggle p-0"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}
          >
            <i className="ti ti-world "></i>...
          </button>

          <div
            className="dropdown-menu dd-menu bg-white shadow rounded border-0 mt-3 p-0"
            data-simplebar
            style={{ height: 180, width: 150 }}
          >
            <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
              <h6 className="mb-0 text-dark">Select Language</h6>
            
            </div>
            <div className="p-3">
              {Object.keys(languageMap).map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    i18next.changeLanguage(item);
                    setMenuAnchor(null);
                  }}
                  style={{ cursor: "pointer" }}
                  className="dropdown-item features text-center feature-primary key-feature p-0 "
                >
                  <div className="d-flex align-items-center">
                     <div className="flex-1">
                      <h6 className="mb-0 text-dark title">
                        {languageMap[item].label}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
  
    </>
  );
};

export default LanguageDropdown;
