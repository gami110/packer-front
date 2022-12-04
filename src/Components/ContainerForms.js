import { Fragment, useState } from 'react';
import './ContainerForm.css';
import './button.css';
import './dowload.css';
import './checkbox.css';
import Modal from './Modal';


const EmptyCargo = {
    width: '0',
    height: '0',
    lenght: '0',
    weight: '0',
    count: '0',
};

function ContainerForms() {
    const options = [{
        value: "20'dc",
        label: "20'DC"
      }, {
        value: "20'hc",
        label: "20'HC" 
      }, {
        value: "40'dv",
        label: "40'DV" 
      }, {
        value: "40'hc",
        label: "40'HC" 
      }, {
        value: "40'hcpw",
        label: "40'HCPW" 
    }]

    const container = {
        "20'dc": {'length': 5898, 'width': 2352, 'height': 2393, 'weight': 28140},
        "20'hc": {'length': 5898, 'width': 2352, 'height': 2393, 'weight': 28140},
        "40'dv": {'length': 12032, 'width': 2352, 'height': 2698, 'weight': 28650},
        "40'hc": {'length': 12032, 'width': 2352, 'height': 2698, 'weight': 28650},
        "40'hcpw": {'length': 12032, 'width': 2352, 'height': 2698, 'weight': 30720},
    }

    const [containerWidth, setContainerWidth] = useState(0)
    const [containerHeight, setContainerHeight] = useState(0)
    const [containerWeight, setContainerWeight] = useState(0)
    const [containerLength, setContainerLength] = useState(0)
    const [containerPriceMin, setContainerPriceMin] = useState(0)
    const [containerPriceOne, setContainerPriceOne] = useState(0)
    const [pickedFileUpload, setPickedFileUpload] = useState(true);
    const [calcResult, setCalcResult] = useState({});   
    const [cargosParams, setCargosParams] = useState([
        {id: 0, ...EmptyCargo}
    ]);
    
    const [selectedFile, setSelectedFile] = useState(null);
    const fileChangeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setPickedFileUpload(true)
        console.log(e.target.files[0])
    }

    const handleSubmit = (e) => {
        const calcFunction = pickedFileUpload ? sendFileCargoParamsRequest : sendRawCargoParamsRequest;   
        calcFunction()
            .then((response) => {
                return response.blob()
            })
            .then((blob) => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = "result.xlsx";
                document.body.appendChild(a);
                a.click();    
                a.remove(); 
            })
            .catch((error) => console.error(error))
    }

    const sendFile = () => {
        const formData = new FormData();
        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );
        const requestOption = {
            method: 'POST',
            body: formData
        };
        return fetch("http://127.0.0.1:8000/api/sendFile/", requestOption)
    }

    // Не реализовано
    const sendRawCargoParamsRequest = () => {
        const formData = new FormData();
        formData.append(
            "cargos",
            cargosParams
        );
        formData.append(
            'container', { 
                'width' : containerWidth, 
                'length': containerLength,
                'height': containerHeight,
                'weight': containerWeight,
            }
        );
        const requestOption = {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return fetch("http://127.0.0.1:8000/api/cargoParamsFile/", requestOption)
    }

    const sendFileCargoParamsRequest = () => {
        return sendFile()
        .then(response => response.json())
        .then(id => {
            const requestOption = {
                method: 'POST',
                body: JSON.stringify({
                    "container": { 
                        'width' : containerWidth, 
                        'length': containerLength,
                        'height': containerHeight,
                        'weight': containerWeight, 
                    },
                    "id" : id,
                }),
                headers: { 'Content-Type': 'application/json' },
            };
            return fetch("http://127.0.0.1:8000/api/calcCargoParamsFile/", requestOption)
        }) 
    }

    function addEmptyCargo() {
        if (cargosParams.length === 10 ) return;

        const newId = cargosParams.at(-1).id + 1;
        const newCargo =  {id: newId, ...EmptyCargo};
        const cargosParamsLocal = JSON.parse(JSON.stringify(cargosParams)); 
        cargosParamsLocal.push(newCargo)

        setCargosParams(cargosParamsLocal);
    }

    const setCargoParamByIdAndName = (id, field, val) => {
        const cargosParamsLocal = JSON.parse(JSON.stringify(cargosParams)); 
        cargosParamsLocal[id][field] = val;
        setCargosParams(cargosParamsLocal);
    }

    const cargoForm = (cargoParams) => {
        const id = cargoParams['id'];
        return (
            <form key={id} className="cargos__item"> 
                <label>
                    Название:
                    <input 
                        type="text" 
                        className="form-control" 
                        onChange={(event) => 
                            setCargoParamByIdAndName(id, 'name',  event.target.value)} 
                        value={cargosParams[id]['name']} 
                        />
                </label>               
                <label>
                    Ширина, мм:
                    <input 
                        type="text" 
                        className="form-control" 
                        onChange={(event) => 
                            setCargoParamByIdAndName(id, 'width',  event.target.value)} 
                        value={cargosParams[id]['width']} 
                        />
                </label>
                <label>
                    Длина, мм:
                    <input 
                        type="text" 
                        className="form-control" 
                        onChange={(event) => 
                            setCargoParamByIdAndName(id, 'height', event.target.value)} 
                        value={cargosParams[id]['height']} 
                        />
                </label>
                <label>
                    Высота, мм:
                    <input 
                        type="text" 
                        className="form-control" 
                        onChange={(event) => 
                            setCargoParamByIdAndName(id, 'lenght', event.target.value)} 
                        value={cargosParams[id]['lenght']} 
                        />
                </label>
                <label>
                    Масса за ед., кг:
                    <input 
                        type="text" 
                        className="form-control" 
                        onChange={(event) => 
                            setCargoParamByIdAndName(id, 'weight', event.target.value)} 
                        value={cargosParams[id]['weight']} 
                        />
                </label>
                <label>
                    Количество, шт:
                    <input 
                        type="text" 
                        className="form-control" 
                        onChange={(event) => 
                            setCargoParamByIdAndName(id, 'count', event.target.value)} 
                        value={cargosParams[id]['count']} 
                        />
                </label>
                <label className='label'>
                    <input type="checkbox" className='checkbox'/>
                    <span className='fake'></span>
                    <span className='text'>Кантование разрешено</span>
                </label>
                <label className='label'>
                    <input type="checkbox" className='checkbox'/>
                    <span className='fake'></span>
                    <span className='text'>Штабелирование разрешено</span>
                </label>                  
            </form>
        );
    }

    const containerTypePicker = (containerType) => {
        setContainerWidth(container[containerType]['width'])
        setContainerHeight(container[containerType]['height'])
        setContainerLength(container[containerType]['length'])
        setContainerWeight(container[containerType]['weight'])
    }
    // const [modalActive, setModalActive] = useState(false)

    return (
        <div className='container-form'>
            <div className='container-form__inner-wrapper'>
                <h1 className="mb-3 text-xl fs-5 font-medium">  Выберите тип контейнера или введите свои размеры: </h1>
                <select className="form-select" onChange={(event) => containerTypePicker(event.target.value)}>
                    <option >Выберите тип контейнера</option>
                    {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <form className="cargos__item">
                    <label>
                        Ширина контейнера, мм:
                        <input type="text"  onChange={(event) => setContainerWidth(event.target.value)} className="form-control" value={containerWidth}/>
                    </label>
                    <label>
                        Длина контейнера, мм:
                        <input type="text" onChange={(event) => setContainerLength(event.target.value)} className="form-control" value={containerLength}/>
                    </label>
                    <label>
                        Высота контейнера, мм:
                        <input type="text" onChange={(event) => setContainerHeight(event.target.value)} className="form-control" value={containerHeight}/>
                    </label>
                    <label>
                        Грузоподъемность контейнера, кг:
                        <input type="text" onChange={(event) => setContainerWeight(event.target.value)} className="form-control" value={containerWeight}/>
                    </label>
                </form>
                <h1 className="h1">Уменьшить размер контейнера</h1>
                <form className="resize_container">
                    <label> Ширина</label>
                        <input type="range" defaultValue={100} 
                        />
                    <label> Длина</label>
                        <input type="range" defaultValue={100}
                        />
                    <label> Высота</label>
                        <input type="range" defaultValue={100} 
                        />
                </form>
                <h1 className="mb-3 text-xl fs-5 font-medium someDiv">  Задайте размер, массу и количество груза или импортируйте свой файл: </h1>
                <button>{pickedFileUpload ? 'Задать параметры грузов' : 'Загрузить файл'}</button>
                { pickedFileUpload ? 
                    <fieldset>
                        <input  
                            type="file" 
                            name="xlsx" 
                            accept=".xlsx"
                            onChange={fileChangeHandler}
                        />                        
                    </fieldset>
                    : 
                    <Fragment>
                        <div className='cargos'>
                            {cargosParams.map(cargo => cargoForm(cargo))}
                        </div>
                        <button className="input-file-btn" onClick={addEmptyCargo}>Добавить груз</button>
                    </Fragment>
                }
                <h1 className="mb-3 text-xl fs-5 font-medium someDiv"> Выберите параметры для погрузки: </h1>
                <form className="cargos__item">

                    <label className='label'>
                        <input type="checkbox" className='checkbox'/>
                        <span className='fake'></span>
                        <span className='text'>Кантование разрешено</span>
                    </label>
                    <label className='label'>
                        <input type="checkbox" className='checkbox'/>
                        <span className='fake'></span>
                        <span className='text'>Штабелирование разрешено</span>
                    </label>                  
                </form>


                <h1 className="mb-3 fs-5 font-medium someDiv">  Минимальная стоимость погрузки одного контейнера и стоимость погрузки одной тонны: </h1>
                <form className="cargos__item">
                    <label>
                        Минимальная стоимость погрузки, руб:
                        <input type="text" className="form-control" onChange={(event) => setContainerPriceMin(event.target.value)} value={containerPriceMin} />
                    </label>
                    <label> 
                        Стоимость 1 тонны сверх минимальной стоимости, руб:
                        <input type="text" className="form-control" onChange={(event) => setContainerPriceOne(event.target.value)} value={containerPriceOne} />
                    </label>
                </form>
                <button className="bn632-hover bn26"  onClick={() => handleSubmit(true)}>Запустить</button>
            </div>
           {/* <Modal active={modalActive} setActive={setModalActive}>
           <form className="cargos__item">
                <label>
                    Колличестов контейнеров, шт:
                    <input type="text" readOnly={true} disabled={true} className="form-control" value={6}/>
                </label>
                <label>
                    Колличество ящиков в одном контейнере, шт:
                    <input type="text" readOnly={true} disabled={true} className="form-control" value={168}/>
                </label>
                <label>
                    Заполненость контейнера по объему, %:
                    <input type="text" readOnly={true} disabled={true} className="form-control" value={84.6}/>
                </label>
                <label>
                    Заполненость контейнера по массе, %:
                    <input type="text" readOnly={true} disabled={true} className="form-control" value={89.55}/>
                </label>
                <label>
                    Стоимость погрузки всех контейнеров, руб:
                    <input type="text" readOnly={true} disabled={true} className="form-control" value={84720}/>
                </label>
            </form>
            <form className='someDiv'>
                <button className="bn632-hover bn26"  onClick={handleSubmit}>Получить результат</button>                
            </form>
           </Modal> */}
        </div>
    )
}

export default ContainerForms;