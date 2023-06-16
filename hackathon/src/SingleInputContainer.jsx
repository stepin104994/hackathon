import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from 'react-bootstrap';

const SingleInputContainer = () => {
    const [mockDataDetails, setMockDataDetails] = useState([]);
    const [columnName, setColumnName] = useState('');
    const [dataType, setDataType] = useState('String');
    const [minValue, setMinValue] = useState("0");
    const [maxValue, setMaxValue] = useState("5");
    const [render, setRender] = useState(true);
    const [exists, setExists] = useState(false);
    const [fileFormat, setFileFormat] = useState('csv');
    const [dataAmount, setDataAmount] = useState(1000);
    const onChange = (e, id) => {
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
        setColumnName('');
        setDataType('');
        setMinValue('');
        setMaxValue('');
        setRender(!render)
    }
    useEffect(() => { }, [mockDataDetails, render])

    const callAPI = () => {
        const result = axios.post(`https://localhost:7248/GetMockData/${dataAmount}/${fileFormat}`, {
            body: mockDataDetails,
            responseType: 'blob'
        })
            .then(({ data }) => {
                const downloadUrl = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', 'file.xlsx');
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const onColumnNameChange = (e) => {
        // console.log("e-->",name,"---",value);
        mockDataDetails.map((item) =>
            item.columnName === e ? setExists(true) : setExists(false)
        )
        console.log("e-->", exists);
        setColumnName(e);
    }
    const handleRemove=(id)=>{
        if(window.confirm('Are you sure to delete row?'))
       {
        let index = mockDataDetails.findIndex(
            (record) => record.id === id
        );
        mockDataDetails.splice(index, 1);
        setMockDataDetails(mockDataDetails);
        setRender(!render)
       }
       else setRender(!render)
    }
    return (
        <>
        <div className="first-page">
            <h1 style={{ fontWeight: 'bold', letterSpacing: '2px' }} className="title">SimuGenius</h1>
            <p className="tag-line"style={{marginLeft:'60px'}}>Data Engine Simulator</p>

            <br />
            <div className="form-group row">
                <div className="form-outline w-25">
                    <label className="form-label  fw-bold"  >Attribute Name</label>
                    <input type="text" placeholder="Enter Attribute Name" required value={columnName} onChange={(e) => onColumnNameChange(e.target.value)} className="form-control" />
                </div>
                <div className="form-outline w-25">
                    <label className="form-label fw-bold" >Data Type</label>
                    <select className="form-select mt-0" value={dataType} onChange={(e) => setDataType(e.target.value)}>
                        <option>String</option>
                        <option>Number</option>
                        <option>Decimal</option>
                        <option>Date</option>
                    </select>
                </div>
                {dataType !== 'Date' ?
                    <>
                        <div className="form-outline w-25">
                            <label className="form-label fw-bold" >Min Range</label>
                            <input type="number" value={Number(minValue)} onChange={(e) => setMinValue(e.target.value)} className="form-control" />
                        </div>
                        <div className="form-outline w-25">
                            <label className="form-label fw-bold" >Max Range</label>
                            <input type="number" value={Number(maxValue)} onChange={(e) => setMaxValue(e.target.value)} className="form-control" />
                        </div>
                    </> :
                    <> <div className="form-outline w-25">
                        <Form.Group controlId="dob">
                            <label className="form-label fw-bold" >Give Min Range</label>
                            <Form.Control type="date" name="dob" value={minValue} placeholder="Date" onChange={(e) => setMinValue(e.target.value)} />
                        </Form.Group>
                    </div>
                        <div className="form-outline w-25">
                            <Form.Group controlId="dob">
                                <label className="form-label fw-bold" >Give Max Range</label>
                                <Form.Control type="date" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} name="dob" placeholder="Date" />
                            </Form.Group>
                        </div>
                    </>}
            </div>
            <br />
            <div className="form-outline w-25">
                <a href="#" data-toggle="tooltip" data-placement="bottom" title={columnName ? exists ? "Column name already exists" : '' : "Please add atleast 1 column"}> <button type="button"  disabled={columnName ? exists ? true : false : true} onClick={handleClick} className="btn btn-primary add-button" >Add Attribute</button></a>

            </div>
            <br /><br />
            {/* <>{console.log(mockDataDetails)}</> */}
            {
                mockDataDetails.length !== 0 &&
                <div className="card" style={{height:'40vh'}}>
                    <div className="table-responsive">
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th>Attribute Name</th>
                                    <th>Data Type</th>
                                    <th>Min Range</th>
                                    <th>Max Range</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockDataDetails?.map(({ id, columnName, dataType, minValue, maxValue }) => (
                                    <tr key={id}>
                                        <td>
                                            <div className="form-outline">
                                                <input name="columnName" type="text" value={columnName} onChange={(e) => onChange(e, id)} className="form-control" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-outline">
                                                <select name="dataType" className="form-select mt-0" value={dataType} onChange={(e) => onChange(e, id)}>
                                                    <option>String</option>
                                                    <option>Number</option>
                                                    <option>Decimal</option>
                                                    <option>Date</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            {
                                                dataType === "Date" ?
                                                    <div className="form-outline">
                                                        <Form.Group controlId="dob">
                                                            <Form.Control name="minValue" value={minValue} type="date" placeholder="Date" onChange={(e) => onChange(e, id)} />
                                                        </Form.Group>
                                                    </div> :
                                                    <div className="form-outline">
                                                        <input name="minValue" type="number" value={Number(minValue)} onChange={(e) => onChange(e, id)} className="form-control" />
                                                    </div>
                                            }
                                        </td>
                                        <td>
                                            {
                                                dataType === "Date" ?
                                                    <div className="form-outline">
                                                        <Form.Group controlId="dob">
                                                            <Form.Control name="maxValue" value={maxValue} type="date" placeholder="Date" onChange={(e) => onChange(e, id)} />
                                                        </Form.Group>
                                                    </div> :
                                                    <div className="form-outline">
                                                        <input name="maxValue" type="number" value={Number(maxValue)} onChange={(e) => onChange(e, id)} className="form-control" />
                                                    </div>
                                            }
                                        </td>
                                        <td>
                                            <Button onClick={()=>handleRemove(id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            }
            <br/>
            

        </div>
        {mockDataDetails.length !== 0 && <div className="form-group row second-container" style={{ display: 'flex' }}>

        <div className="form-outline w-25">
            <select className="form-select mt-0" value={fileFormat} onChange={(e) => setFileFormat(e.target.value)}>
                <option>csv</option>
                <option>tsv</option>
                <option>json</option>
                <option>xml</option>
            </select>
        </div>

        <div className="form-outline w-25">
            <input type="number" placeholder="Data Count" required value={dataAmount} onChange={(e) => setDataAmount(e.target.value)} className="form-control" />
        </div>
        <div className="form-outline w-25">
            <Button onClick={callAPI}>Generate Data</Button>
        </div>
    </div>}</>
    )
}

export default SingleInputContainer;