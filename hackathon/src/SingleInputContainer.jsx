import React, { useEffect, useState } from "react"


const SingleInputContainer = () => {
    const [mockDataDetails, setMockDataDetails] = useState([]);
    const [columnName, setColumnName] = useState('');
    const [dataType, setDataType] = useState('String');
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(5);
    const [render, setRender] = useState(true);

    const onChange = (e,id) => {
        const { name, value } = e.target
        // console.log("e-->",name,"---",value);
        const editedData = mockDataDetails.map((item) =>
            item.id === id && name ? { ...item, [name]: value } : item
        )

        setMockDataDetails(editedData)
    }

    const handleClick = () => {
        mockDataDetails.push({
            id: Math.floor(Math.random() * (9999 - 100 + 1) + 1000),
            columnName: columnName,
            dataType: dataType,
            minValue: minValue,
            maxValue: maxValue
        })
        setMockDataDetails(mockDataDetails)
        setRender(!render)
    }
    useEffect(() => { }, [mockDataDetails, render])
    return (
        <div className="container">
            <h1 style={{ color: 'white' }} className="title">Mock Data Generator</h1>
            <br /><br />
            <div className="form-group row">
                <div className="form-outline w-25">
                    <label style={{ color: 'white' }} className="form-label fw-bold"  >Column Name</label>
                    <input type="text" onChange={(e) => setColumnName(e.target.value)} className="form-control" />
                </div>
                <div className="form-outline w-25">
                    <label style={{ color: 'white' }} className="form-label fw-bold" >Select Data Type</label>
                    <select className="form-select mt-0" onChange={(e) => setDataType(e.target.value)}>
                        <option>String</option>
                        <option>Number</option>
                        <option>Decimal</option>
                    </select>
                </div>

                <div className="form-outline w-25">
                    <label style={{ color: 'white' }} className="form-label fw-bold" >Give Min</label>
                    <input type="number" onChange={(e) => console.log(typeof(Number(e.target.value)),"---",e)} className="form-control" />
                </div>
                <div className="form-outline w-25">
                    <label style={{ color: 'white' }} className="form-label fw-bold" >Give Max</label>
                    <input type="number" onChange={(e) => setMaxValue(e.target.value)} className="form-control" />
                </div>
            </div>
            <br /><br />
            <div className="form-outline w-25">
                <button type="button" disabled={columnName ? false : true} onClick={handleClick} className="btn btn-primary" >Add the column</button>
            </div>
            <br /><br />
            {/* <>{console.log(mockDataDetails)}</> */}
            <div className="card">
                <div className="table-responsive">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>Column Name</th>
                                <th>Data Type</th>
                                <th>Min Value</th>
                                <th>Max Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockDataDetails?.map(({ id, columnName, dataType, minValue, maxValue }) => (
                                <tr key={id}>
                                    <td>
                                        <div className="form-outline">
                                            <input name="columnName" type="text" value={columnName} onChange={(e) => onChange(e,id)} className="form-control" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-outline">
                                            <select name="dataType" className="form-select mt-0" value={dataType} onChange={(e) => onChange(e,id)}>
                                                <option>String</option>
                                                <option>Number</option>
                                                <option>Decimal</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-outline">
                                            <input name="minValue" type="number" value={minValue} onChange={(e) => onChange(e,id)}className="form-control" />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-outline">
                                            <input name="maxValue" type="number" value={maxValue} onChange={(e) => onChange(e,id)} className="form-control" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div></div>
        </div>
    )
}

export default SingleInputContainer;