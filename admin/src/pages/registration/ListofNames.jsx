import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import TableComponent from "../../components/TableComponent";
import CustomEditModal from "../../components/CustomEditModel";
import Confirm from "../../components/Confirm";
import LeftSideBarAdmin from "../../components/LeftSideBarAdmin";

export default function ListofNames() {
    const { ID } = useParams();
    const navigate = useNavigate();
    const [dataExaminee, setDataExaminee] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [conFirmDelete, setConFirmDelete] = useState(false);
    const [formData, setFormData] = useState({
        enrollments_id: '',
        thai_id: '',
        firstname: '',
        lastname: '',
        Namesubject: '',
        location: '',
        room: ''
    })
    const [num, setNum] = useState(0);
    const [examID, setExamID] = useState();
    const [isGenerating, setIsGenerating] = useState(false)

    const columns = [
        { header: "รหัสผู้เข้าสอบ", accessor: "enrollments_id", className: "w-[5%] p-2" },
        { header: "รหัสบัตรประชาชน", accessor: "thai_id", className: "w-[5%] p-2" },
        { header: "ชื่อ", accessor: "firstname", className: "w-[5%] p-2" },
        { header: "นามสกุล", accessor: "lastname", className: "w-[5%] p-2" },
        {
            header: "วิชาที่สอบ",
            className: "w-[6%] p-2",
            render: (row) => row.examInfo?.exam_set_name || "-"
        },
        {
            header: "สถานที่สอบ",
            className: "w-[6%] p-2",
            render: (row) => row.examInfo?.exam_building || 0
        },
        {
            header: "ห้องสอบ",
            className: "w-[6%] p-2",
            render: (row) => row.examInfo?.exam_room || 0
        },
        {
            header: "",
            className: "w-[6%] pl-2 pt-2 pb-2 pr-8",
            render: (row) => (
                <div className="flex justify-between w-full items-center">
                <button onClick={() => headleEdit(row)} className="text-center w-full border rounded-[8px] bg-[#FFC107] hover:bg-[#ff9800]">
                    แก้ไข
                </button>
                <button onClick={() => {
                    setConFirmDelete(true)
                    setExamID(row.enrollments_id)
                    }} className="text-center w-full border rounded-[8px] bg-[#f44336] hover:bg-[#d32f2f]">
                    ลบ
                </button>
                </div>
            )
        }
    ];

    const columnsEdit = [
        { label: "รหัสผู้เข้าสอบ", key: "enrollments_id" },
        { label: "รหัสบัตรประชาชน", key: "thai_id"},
        { label: "ชื่อ", key: "firstname"},
        { label: "นามสกุล", key: "lastname"},
        { label: "วิชาที่สอบ", key: "Namesubject"},
        { label: "สถานที่สอบ", key: "location"},
        { label: "ห้องสอบ", key: "room"}
    ]

    const title = `ยืนยันการลบชุดข้อสอบ รหัส ${examID} หรือไม่?`

    const headleEdit = (exam) => {
        setFormData({
            enrollments_id: exam.enrollments_id,
            thai_id: exam.thai_id,
            firstname: exam.firstname,
            lastname: exam.lastname,
            Namesubject: exam.examInfo?.exam_set_name,
            location: exam.examInfo?.exam_building,
            room: exam.examInfo?.exam_room
        })
        setIsEditMode(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("handleChange called:", name, value); // เช็ค log
        setFormData(prevFormData => {
            const updated = { ...prevFormData, [name]: value };
            console.log("Updated formData:", updated);
            return updated;
        });
    };

    const handleSave = async () => {
        const {
            enrollments_id,
            thai_id,
            firstname,
            lastname,
            Namesubject,
            location,
            room
        } = formData;

        if (
            !enrollments_id ||
            !thai_id ||
            !firstname ||
            !lastname ||
            !Namesubject ||
            !location ||
            !room
        ) {
            alert("❌ กรุณากรอกข้อมูลให้ครบทุกช่อง!");
            return;
        }

        try {
            const res = await axios.put(
                `http://localhost:5000/api/admin/edit-list-names/${ID}`,
                formData
            );
            if (res.status === 200) {
                alert("✅ แก้ไขข้อมูลเสร็จสิ้น")
                await fetchData(); // โหลดข้อมูลใหม่ใส่ตาราง
            }

            setIsEditMode(false);
            setFormData({
                enrollments_id: '',
                thai_id: '',
                firstname: '',
                lastname: '',
                Namesubject: '',
                location: '',
                room: '' 
            })
        } catch(error) {
            console.error("❌ เกิดข้อผิดพลาด:", error.response?.data || error);
            alert("❌ ไม่สามารถบันทึกได้");
        }
    };

    const handleDelete = async (examID) => {
        // const examID = exam.enrollments_id
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/admin/delete-list-names/${examID}/${ID}`
            );
            if (res.status === 200) {
                alert(`✅ ลบรายชื่อ ${examID} สำเร็จ`);
                await fetchData();
                setConFirmDelete(false);
            } else {
                alert(`❌ ไม่สามารถลบรายชื่อ ${examID} ได้`);
            }
        } catch(error) {
            console.error("❌ เกิดข้อผิดพลาดในการลบ:", error);
            alert("❌ ไม่สามารถลบรายชื่อได้")
        }
    }

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/admin/list-of-names/${ID}`);
            console.log(res.data.rows);
            setDataExaminee(res.data.rows);
            setNum(res.data.num);
        } catch (err) {
            console.error("โหลดข้อมูลล้มเหลว:", err);
        }
    }, [ID]);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    const generatePDF = async () => {
        setIsGenerating(true); // โชว์ div

        // รอให้ React render เสร็จ
        await new Promise((resolve) => setTimeout(resolve, 200)); // มากกว่า 100ms จะปลอดภัยขึ้น

        const input = document.getElementById("pdf-content");
        if (!input) return;

        const canvas = await html2canvas(input, {
            scale: 2, // ความคมชัดดีขึ้น
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`รายชื่อผู้สมัครสอบ ${ID}.pdf`);

        setIsGenerating(false); // ซ่อน div
    };

    const generateCSV = () => {
        if (!dataExaminee || dataExaminee.length === 0) {
            alert("ไม่มีข้อมูลสำหรับดาวน์โหลด CSV");
            return;
        }

        // 1. หัวตาราง CSV
        const headers = [
            "รหัสผู้เข้าสอบ",
            "คำนำหน้า",
            "ชื่อ",
            "นามสกุล",
            "เลขบัตรประชาชน",
            "ชื่อวิชา",
            "วันสอบ",
            "สถานะการชำระเงิน",
            "สถานะการสอบ"
        ];

        // 2. แปลงข้อมูลแต่ละแถวให้เป็น CSV
        const rows = dataExaminee.map((item) => [
            item.enrollments_id,
            item.prefix,
            item.firstname,
            item.lastname,
            item.thai_id ? `"${item.thai_id}"` : "",
            item.examInfo?.exam_set_name || "", // เข้าถึง examInfo
            formatThaiDate(item.examInfo?.start_datetime) || "", // วันสอบ (ถ้ามี)
            item.payment_status,
            item.exam_status
        ]);

        // สร้างเนื้อหา CSV
        const csvContent = [headers, ...rows]
            .map((row) =>
            row.map((value) => `"${value?.toString().replace(/"/g, '""')}"`).join(",")
        )
        .join("\n");

        // 3. สร้าง Blob และ trigger download
        const BOM = "\uFEFF";
        const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `รายชื่อผู้สมัครสอบ ${ID}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    function formatThaiDate(dateString) {
        const date = new Date(dateString);

        const day = date.getDate();
        const month = date.toLocaleString('th-TH', { month: 'long' }); // เช่น กรกฎาคม
        const year = date.getFullYear() + 543; // แปลงเป็น พ.ศ.

        return `${day} ${month} ${year}`;
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <LeftSideBarAdmin />

            <main className="ml-80 p-6 font-sans text-gray-800">
                {/*************** header ******************/}
                <div className='max-w-[97%] mx-auto mt-[30px] w-full font-sans text-gray-800'>
                    {/* Header ของ ระบบสมัครสอบ */}
                    <div className='flex items-center border-b-4 border-black pb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                        </svg>
                    <h1 onClick={() => navigate(-1)} className='text-[25px] ml-[10px] cursor-pointer hover:text-blue-700 transition'>ระบบสมัครสอบ</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="mt-1" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    <h1 className="text-[25px] ml-[10px]">รายชื่อ</h1>
                </div>
                </div>
                {/*************** section ******************/}
                <div className="flex flex-col w-full h-full justify-between items-center px-6">
                    <div className="w-full py-4">
                        <div className="flex justify-between items-start w-full h-[150px]">
                            {/* กลาง: จำนวนผู้สมัครสอบ */}
                            <div className="mx-auto text-center">
                            <div className="text-[30px] font-bold">จำนวนผู้สมัครสอบ</div>
                            <div className="flex justify-center items-baseline">
                                <span className="text-[75px] text-[#082290] leading-none font-bold">{num}</span>
                                <span className="ml-2 text-[24px] font-bold">คน</span>
                            </div>
                            </div>

                            {/* ขวา: ดาวน์โหลดข้อมูล */}
                            <div className="flex flex-col justify-end self-end items-end space-x-2">
                                <div className="flex items-center space-x-2">
                                    <span className="pb-[2px]">ดาวน์โหลดข้อมูล</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16">
                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0"/>
                                    </svg>
                                </div>
                                <div className="flex w-full justify-between border-[2px]">
                                    <button onClick={generateCSV} className="w-full border-r-[2px] hover:bg-[#d3d3d3]">.CSV</button>
                                    <button onClick={generatePDF} className="w-full hover:bg-[#d3d3d3]">.PDF</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TableComponent columns={columns} data={dataExaminee} />
                    
                    {isEditMode && (
                        <CustomEditModal 
                            columns={columnsEdit} 
                            data={formData} 
                            handleChange={handleChange} 
                            handleSave={handleSave} 
                            onClose={() => setIsEditMode(false)} 
                        />
                    )}

                    {conFirmDelete && (
                        <Confirm
                            handleSubmit={() => handleDelete(examID)}
                            onClose={() => setConFirmDelete(false)}
                            title={title}
                        />
                    )}

                    <div id="pdf-content" className={`w-[794px] h-[1123px] p-[40px] ${isGenerating ? "block" : "hidden"} bg-white`}>
                        <div className="text-[25px] text-center pt-[10px] pb-[50px]">รายชื่อผู้สมัครสอบวิชา {dataExaminee[0]?.examInfo?.exam_set_name}</div>
                        <div className="flex justify-between">
                            <div className="text-[18px] ml-[5%]"><strong className="pr-[20px]">สอบวันที่</strong> {formatThaiDate(dataExaminee[0]?.examInfo?.start_datetime)}</div>
                            <div className="text-[18px] mr-[5%]">มหาลัยสวนดุสิต กรุงเทพมหานคร 10150</div>
                        </div>
                        <div className="flex justify-center mx-[10%] mt-[50px] flex-col">
                            <div className="grid grid-cols-[150px_1fr] gap-4 font-bold text-center py-2 border-b border-gray-300">
                                <div><strong>รหัสผู้เข้าสอบ</strong></div>
                                <div><strong>ชื่อ - นามสกุล</strong></div>
                            </div>
                            <div>
                                {dataExaminee.map((exam, i) => (
                                    <div key={i} className="grid grid-cols-[150px_1fr] gap-[25%] py-1 border-b border-gray-100">
                                        <div className="text-center">{exam.enrollments_id}</div>
                                        <div className="text-left"><strong>{exam.prefix}</strong>{" "}
                                        <span className="pr-[20px]">{exam.firstname}</span>{exam.lastname}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </main>
        </div>
    )
}