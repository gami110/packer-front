import { useState } from 'react';
import './ContainerForm.css';
import Modal from './Modal';


function ContainerForm() {
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

    const [containerWidth, setContainerWidth] = useState(0)
    const [containerHeight, setContainerHeight] = useState(0)
    const [containerWeight, setContainerWeight] = useState(0)
    const [containerLength, setContainerLength] = useState(0)

    const containerTypePicker = (containerType) => {
        fetch('http://127.0.0.1:8000/api/getContainerParams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'name' : containerType })
        })
            .then((res) => res.json())
            .then((containerParams) => {    
                setContainerWidth(containerParams['width'])
                setContainerHeight(containerParams['height'])
                setContainerLength(containerParams['length'])
                setContainerWeight(containerParams['weight'])
            })
    }
    const [modalActive, setModalActive] = useState(false)

    return (
        <div className='container-form'>
            <div className='container-form__inner-wrapper'>
                <h1 className="mb-3 text-xl fs-5 font-medium">  Выберите тип контейнера или введите свои размеры: </h1>
                <select className="form-select" onChange={(event) => containerTypePicker(event.target.value)}>
                    {/* <option disabled selected={true}>Выберите тип контейнера</option> */}
                    {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <form className="someDiv">
                    <label>
                        Ширина контейнера, мм:
                        <input type="text"  disabled={false} className="form-control" value={containerWidth}/>
                        </label>
                        <label>
                            Длина контейнера, мм:
                        <input type="text" readOnly={false} disabled={false} className="form-control" value={containerLength}/>
                        </label>
                        <label>
                            Высота контейнера, мм:
                            <input type="text" readOnly={true} disabled={true} className="form-control" value={containerHeight}/>
                        </label>
                        <label>
                            Грузоподъемность контейнера, кг:
                            <input type="text" readOnly={true} disabled={true} className="form-control" value={containerWeight}/>
                        </label>
                </form>
                
                <h1 className="mb-3 text-xl fs-5 font-medium someDiv">  Задайте размер, массу и количество груза: </h1>
                <form className="someDiv">
                    <label>
                        Ширина, мм:
                        <input type="text" className="form-control" />
                        </label>
                        <label>
                            Длина, мм:
                            <input type="text" className="form-control" />
                        </label>
                        <label>
                            Высота, мм:
                            <input type="text" className="form-control" />
                        </label>
                        <label>
                            Масса, кг:
                            <input type="text" className="form-control" />
                        </label>
                        <label>
                            Количество, шт:
                            <input type="text" className="form-control" />
                        </label>
                </form>
                <h1 className="mb-3 fs-5 font-medium someDiv">  Минимальная стоимость контейнера и стоимость одной тонны : </h1>
                <form className="someDiv">
                    <label>
                        Минимальная стоимость, руб:
                        <input type="text" className="form-control" /> 
                        Стоимость 1 тонны сверх минимальной стоимости, руб:
                        <input type="text" className="form-control" />
                    </label>
                </form>
                <button className="butTon" onClick={() => setModalActive(true)}>Запустить</button>
            </div>
           <Modal active={modalActive} setActive={setModalActive}>
           <form className="someDiv">
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
           </Modal>
        </div>
    )
}

export default ContainerForm;