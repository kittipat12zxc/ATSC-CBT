export default function CustomEditModal({columns, data, handleChange, handleSave, onClose}) {
    console.log("render modal", data);
    return(
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[999]">
                <div className="bg-white p-6 rounded-xl w-[400px] h-[400px] flex flex-col gap-3 overflow-x-scroll">
                    {columns.map(({key, label}) => (
                        <div key={key}>
                            <label className="flex justify-between mt-4">{label}:</label>
                            <input
                            name={key}
                            placeholder={label}
                            onChange={(e) => {
                                console.log("INPUT fired:", e.target.name, e.target.value);
                                handleChange(e);
                            }}
                            readOnly={key === "enrollments_id"}
                            value={data[key] || ''}
                            className="p-2 text-base w-full rounded border border-gray-300"
                            />
                        </div>
                    ))}
                    <div className="flex justify-between mt-4">
                        <button className="py-[2%] px-[5%] border rounded-[8px] bg-[#2196F3] hover:bg-[#1775bf] text-white" onClick={handleSave}> บันทึก</button>
                        <button className="py-[2%] px-[5%] border rounded-[8px] bg-[#f44336] hover:bg-[#d32f2f] text-white" onClick={onClose}> ยกเลิก</button>
                    </div>
                </div>
            </div>
        </>
    )
}