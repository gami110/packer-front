import { useState } from 'react';
import './ContainerForm.css';
import './button.css';
import './dowload.css';
import './checkbox.css';
import Modal from './Modal';




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
    const [containerWidth1, setContainerWidth1] = useState(0)
    const [containerLength1, setContainerLength1] = useState(0)
    const [containerHeight1, setContainerHeight1] = useState(0)
    const [containerWeight1, setContainerWeight1] = useState(0)
    const [containerCount, setContainerCount] = useState(0)
    const [containerPrice, setContainerPrice] = useState(0)
    const [containerPrice1, setContainerPrice1] = useState(0)

    const containerTypePicker = (containerType) => {
        setContainerWidth(container[containerType]['width'])
        setContainerHeight(container[containerType]['height'])
        setContainerLength(container[containerType]['length'])
        setContainerWeight(container[containerType]['weight'])
    }
    const [modalActive, setModalActive] = useState(false)

    return (
        <div className='container-form'>
            <div className='container-form__inner-wrapper'>
                <h1 className="mb-3 text-xl fs-5 font-medium">  Выберите тип контейнера или введите свои размеры: </h1>
                <select className="form-select" onChange={(event) => containerTypePicker(event.target.value)}>
                    <option disabled defaultValue={true}>Выберите тип контейнера</option>
                    {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                <form className="someDiv">
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
                
                <h1 className="mb-3 text-xl fs-5 font-medium someDiv">  Задайте размер, массу и количество груза или импортируйте свой файл: </h1>
                <form className="someDiv">                
                    <label>
                        Ширина, мм:
                        <input type="text" className="form-control" onChange={(event) => setContainerWidth1(event.target.value)} value={containerWidth1} />
                        </label>
                        <label>
                            Длина, мм:
                            <input type="text" className="form-control" onChange={(event) => setContainerLength1(event.target.value)} value={containerLength1} />
                        </label>
                        <label>
                            Высота, мм:
                            <input type="text" className="form-control" onChange={(event) => setContainerHeight1(event.target.value)} value={containerHeight1} />
                        </label>
                        <label>
                            Масса за ед., кг:
                            <input type="text" className="form-control" onChange={(event) => setContainerWeight1(event.target.value)} value={containerWeight1} />
                        </label>
                        <label>
                            Количество, шт:
                            <input type="text" className="form-control" onChange={(event) => setContainerCount(event.target.value)} value={containerCount} />
                        </label>
                        <label className="input-file">
	   	                    <input type="file"/>
 	   	                    <span className="input-file-btn">Выберите файл</span>
 	                    </label>
                </form>

                <h1 className="mb-3 text-xl fs-5 font-medium someDiv">  Выберите параметры для погрузки: </h1>
                <form className="someDiv">

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
                <form className="someDiv">
                    <label>
                        Минимальная стоимость погрузки, руб:
                        <input type="text" className="form-control" onChange={(event) => setContainerPrice(event.target.value)} value={containerPrice} />
                    </label>
                    <label> 
                        Стоимость 1 тонны сверх минимальной стоимости, руб:
                        <input type="text" className="form-control" onChange={(event) => setContainerPrice1(event.target.value)} value={containerPrice1} />
                    </label>
                </form>
                <button className="bn632-hover bn26"  onClick={() => setModalActive(true)}>Запустить</button>
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

export default ContainerForms;