/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import CSVPNG from "../../../../assets/csv.png";
import XLSPNG from "../../../../assets/xls.png";
import { useZustandStateDocumen } from "../../../../store/stateDocument";

const DownloadBox = ({ onClickDownloadLaporan }) => {
    const { setDownloadType, downloadType } = useZustandStateDocumen((state) => state);

    // const [selected, setSelected] = useState("optionXLS"); // nilai radio yang terpilih
    const handleSelectRadioOnChange = (e) => {
        // setSelected(e)
        setDownloadType(e)
    };
    const onHandleIconClick = (e) => {
        // setSelected(e)
        setDownloadType(e)

    };

    return (
        <div className='flex flex-row-reverse w-full h-full  items-center'>
            <button className='flex w-[200px] h-[35px] justify-center items-center bg-[#009959] text-textColor  rounded-lg shadow-md'
                onClick={onClickDownloadLaporan}
            >Download Table</button>

            <div className='flex mr-[20px]' onClick={() => onHandleIconClick("optionCVS")}>
                <label className="inline-flex items-center mr-[10px]">
                    <input
                        type="radio"
                        name="option"
                        value="optionCVS"
                        className={`form-radio accent-[#009959]`}
                        checked={downloadType === "optionCVS"}
                        onChange={(e) => handleSelectRadioOnChange(e.target.value)}
                    />
                </label>
                <div className='w-[40px] h-[40px] bg-white rounded-lg p-1'>
                    <img src={CSVPNG} alt="" />
                </div>
            </div>
            <div className='flex mr-[10px]' onClick={() => onHandleIconClick("optionXLS")}>
                <label className="inline-flex items-center mr-[10px]">
                    <input
                        type="radio"
                        name="option"
                        value="optionXLS"
                        className="form-radio accent-[#009959]"
                        checked={downloadType === "optionXLS"}
                        onChange={(e) => handleSelectRadioOnChange(e.target.value)}
                    />
                </label>
                <div className='w-[40px] h-[40px] bg-white rounded-lg p-1'>
                    <img src={XLSPNG} alt="" />
                </div>
            </div>


        </div>
    )
}

export default DownloadBox