import React, { useState, useEffect } from 'react';
// Thư viện cho hiệu ứng chuyển động
import { motion, AnimatePresence } from 'framer-motion';
// Thư viện cho biểu đồ
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


// --- BƯỚC 1: DỮ LIỆU VÀ LOGIC ---

const surveySections = [
  {
    sectionId: 1,
    sectionTitle: "Phần I: Thông Tin Cá Nhân và Hồ Sơ Đầu Tư",
    questions: [
      { id: 'q1', text: 'Độ tuổi của bạn:', options: [ { text: 'Dưới 30', score: 3 }, { text: '30 – 45', score: 2 }, { text: '46 – 60', score: 1 }, { text: 'Trên 60', score: 1 } ] },
      { id: 'q2', text: 'Tình trạng nghề nghiệp và thu nhập:', options: [ { text: 'Khởi nghiệp, thu nhập biến động', score: 3 }, { text: 'Ổn định, tích lũy tài sản', score: 2 }, { text: 'Sắp nghỉ hưu, ưu tiên an toàn', score: 1 }, { text: 'Sinh viên, chưa có thu nhập', score: 0 } ] },
      { id: 'q3', text: 'Tình trạng gia đình và trách nhiệm tài chính:', options: [ { text: 'Độc thân, không người phụ thuộc', score: 3 }, { text: 'Có gia đình, con nhỏ hoặc chăm sóc người thân', score: 2 }, { text: 'Nhiều trách nhiệm tài chính lớn', score: 1 } ] },
      { id: 'q4', text: 'Kế hoạch tài chính trong 5 năm tới:', options: [ { text: 'Tích lũy, đầu tư dài hạn', score: 3 }, { text: 'Chuẩn bị nhu cầu ngắn hạn (mua nhà, giáo dục)', score: 2 }, { text: 'Ưu tiên an toàn, bảo toàn vốn', score: 1 } ] },
      { id: 'q5', text: 'Trình độ học vấn:', options: [ { text: 'Sau đại học/chuyên môn cao', score: 3 }, { text: 'Đại học', score: 2 }, { text: 'Trung học hoặc dưới', score: 1 } ] },
      { id: 'q6', text: 'Nguồn thông tin đầu tư chính của bạn:', options: [ { text: 'Tự nghiên cứu hoặc công cụ phân tích tự động', score: 3 }, { text: 'Tư vấn chuyên gia hoặc diễn đàn đầu tư', score: 2 }, { text: 'Dựa vào người quen hoặc truyền thông', score: 1 } ] },
    ]
  },
  {
    sectionId: 2,
    sectionTitle: "Phần II: Thái Độ Với Rủi Ro và Phản Ứng Thị Trường",
    questions: [
        { id: 'q7', text: 'Ưu tiên đầu tư của bạn:', options: [ { text: 'Bảo toàn vốn tuyệt đối', score: 1 }, { text: 'Tăng trưởng ổn định, rủi ro vừa phải', score: 2 }, { text: 'Lợi nhuận cao, chấp nhận rủi ro lớn', score: 3 } ] },
        { id: 'q8', text: 'Nếu danh mục đầu tư giảm 20% trong 1–2 tuần:', options: [ { text: 'Bán tháo để cắt lỗ', score: 1 }, { text: 'Giữ nguyên, theo dõi thị trường', score: 2 }, { text: 'Mua thêm để tận dụng giá thấp', score: 3 } ] },
        { id: 'q9', text: 'Khi nghe về cơ hội đầu tư lợi suất cao, rủi ro lớn:', options: [ { text: 'Cân nhắc kỹ, thu thập thông tin', score: 1 }, { text: 'Đầu tư một phần nhỏ để thử nghiệm', score: 2 }, { text: 'Đầu tư mạnh nếu thấy tiềm năng', score: 3 } ] },
        { id: 'q10', text: 'Mức độ thoải mái với biến động thị trường:', options: [ { text: 'Lo lắng, dễ bị ảnh hưởng', score: 1 }, { text: 'Chấp nhận biến động vừa phải', score: 2 }, { text: 'Bình tĩnh, tin tưởng chiến lược dài hạn', score: 3 } ] },
        { id: 'q11', text: 'Sẵn sàng đầu tư vào tài sản mới (tiền điện tử, NFT):', options: [ { text: 'Không, chỉ đầu tư tài sản truyền thống', score: 1 }, { text: 'Có, chiếm phần nhỏ danh mục', score: 2 }, { text: 'Rất sẵn sàng, tin vào tiềm năng', score: 3 } ] },
        { id: 'q12', text: 'Nguồn thông tin ra quyết định đầu tư:', options: [ { text: 'Dựa vào một nguồn duy nhất', score: 1 }, { text: 'Tham khảo 2–3 nguồn', score: 2 }, { text: 'Phân tích từ nhiều nguồn, tự quyết định', score: 3 } ] },
    ]
  },
  {
    sectionId: 3,
    sectionTitle: "Phần III: Kinh Nghiệm và Kiến Thức Đầu Tư",
    questions: [
        { id: 'q13', text: 'Thời gian tham gia đầu tư:', options: [ { text: 'Dưới 1 năm', score: 1 }, { text: '1–3 năm', score: 3 }, { text: 'Trên 3 năm', score: 5 } ] },
        { id: 'q14', text: 'Loại hình tài sản bạn thường đầu tư:', options: [ { text: 'Tài sản an toàn (tiền gửi, trái phiếu chính phủ)', score: 1 }, { text: 'Tài sản trung bình (trái phiếu doanh nghiệp, quỹ hỗn hợp)', score: 3 }, { text: 'Tài sản rủi ro cao (cổ phiếu, tiền điện tử)', score: 5 } ] },
        { id: 'q15', text: 'Hiểu biết về khái niệm đầu tư (đa dạng hóa, beta, alpha):', options: [ { text: 'Rất ít', score: 1 }, { text: 'Ít', score: 2 }, { text: 'Trung bình', score: 3 }, { text: 'Tương đối cao', score: 4 }, { text: 'Rất cao', score: 5 } ] },
        { id: 'q16', text: 'Phương pháp phân tích đầu tư chính:', options: [ { text: 'Theo lời khuyên/xu hướng thị trường', score: 1 }, { text: 'Phân tích cơ bản hoặc kỹ thuật', score: 3 }, { text: 'Kết hợp nhiều phương pháp/công cụ tự động', score: 5 } ] },
        { id: 'q17', text: 'Tần suất tham gia khóa học, hội thảo đầu tư:', options: [ { text: 'Rất ít/không bao giờ', score: 1 }, { text: 'Thỉnh thoảng', score: 3 }, { text: 'Thường xuyên', score: 5 } ] },
        { id: 'q18', text: 'Tần suất tham gia cộng đồng, diễn đàn đầu tư:', options: [ { text: 'Không bao giờ', score: 1 }, { text: 'Thỉnh thoảng', score: 3 }, { text: 'Thường xuyên', score: 5 } ] },
    ]
  },
  {
    sectionId: 4,
    sectionTitle: "Phần IV: Tình Hình Tài Chính và Khả Năng Thanh Khoản",
    questions: [
        { id: 'q19', text: 'Tình trạng tài chính cá nhân:', options: [ { text: 'Thu nhập không đều, quỹ dự phòng dưới 3 tháng', score: 1 }, { text: 'Thu nhập ổn định, quỹ dự phòng 3–6 tháng', score: 2 }, { text: 'Thu nhập ổn định, quỹ dự phòng trên 6 tháng', score: 3 } ] },
        { id: 'q20', text: 'Phần trăm tài sản đầu tư vào sản phẩm rủi ro cao:', options: [ { text: 'Dưới 10%', score: 1 }, { text: '10%–30%', score: 2 }, { text: 'Trên 30%', score: 3 } ] },
        { id: 'q21', text: 'Thái độ với đòn bẩy tài chính:', options: [ { text: 'Tránh sử dụng, ưu tiên vốn tự có', score: 1 }, { text: 'Sử dụng vừa phải nếu lợi suất cao', score: 2 }, { text: 'Sử dụng mạnh để tối đa hóa lợi nhuận', score: 3 } ] },
        { id: 'q22', text: 'Khả năng thanh khoản của danh mục đầu tư:', options: [ { text: 'Ưu tiên thanh khoản cao', score: 3 }, { text: 'Kết hợp thanh khoản cao và dài hạn', score: 2 }, { text: 'Chủ yếu đầu tư dài hạn, thanh khoản thấp', score: 1 } ] },
        { id: 'q23', text: 'Quỹ dự phòng tài chính riêng biệt:', options: [ { text: 'Không có', score: 1 }, { text: 'Có, dưới 3–6 tháng chi tiêu', score: 2 }, { text: 'Có, đủ trên 6 tháng chi tiêu', score: 3 } ] },
        { id: 'q24', text: 'Khả năng tiếp cận nguồn tài chính bổ sung (vay, tín dụng):', options: [ { text: 'Không, chỉ dùng vốn tự có', score: 1 }, { text: 'Có, trong trường hợp khẩn cấp', score: 2 }, { text: 'Dễ dàng tiếp cận khi cần', score: 3 } ] },
    ]
  },
  {
    sectionId: 5,
    sectionTitle: "Phần V: Kỳ Vọng và Mục Tiêu Đầu Tư",
    questions: [
        { id: 'q25', text: 'Mức lợi nhuận kỳ vọng hàng năm:', options: [ { text: 'Bằng với lãi suất tiền gửi kỳ hạn 1 năm', score: 1 }, { text: '1-2 lần lãi suất tiền gửi kỳ hạn 1 năm', score: 2 }, { text: 'Gấp nhiều lần lãi suất tiền gửi', score: 3 } ] },
        { id: 'q26', text: 'Khả năng điều chỉnh mục tiêu khi thị trường biến động:', options: [ { text: 'Khó, giữ chiến lược ban đầu', score: 1 }, { text: 'Có thể điều chỉnh dựa trên phân tích', score: 2 }, { text: 'Linh hoạt thay đổi theo thị trường', score: 3 } ] },
        { id: 'q27', text: 'Cân bằng rủi ro và lợi nhuận trong chiến lược:', options: [ { text: 'Ưu tiên an toàn, lợi nhuận thấp', score: 1 }, { text: 'Cân bằng an toàn và tăng trưởng', score: 2 }, { text: 'Chấp nhận rủi ro cao để tối đa hóa lợi nhuận', score: 3 } ] },
        { id: 'q28', text: 'Thói quen đánh giá rủi ro trước khi đầu tư:', options: [ { text: 'Dựa vào cảm nhận/xu hướng', score: 1 }, { text: 'Sử dụng một vài chỉ số cơ bản', score: 2 }, { text: 'Phân tích hệ thống (định lượng, định tính)', score: 3 } ] },
    ]
  },
  {
    sectionId: 6,
    sectionTitle: "Phần VI: Yếu Tố Hành Vi và Tâm Lý",
    questions: [
        { id: 'q29', text: 'Cảm xúc khi đối mặt tổn thất đầu tư:', options: [ { text: 'Lo lắng, dễ bị ảnh hưởng', score: 1 }, { text: 'Không thoải mái nhưng kiểm soát được', score: 2 }, { text: 'Bình tĩnh, tin tưởng chiến lược dài hạn', score: 3 } ] },
        { id: 'q30', text: 'Ảnh hưởng bởi xu hướng “chạy theo đám đông” (FOMO):', options: [ { text: 'Rất dễ bị cuốn theo', score: 1 }, { text: 'Có ảnh hưởng nhưng cố kiểm soát', score: 2 }, { text: 'Ít/không, dựa vào nghiên cứu cá nhân', score: 3 } ] },
        { id: 'q31', text: 'Phản ứng với tin tức tiêu cực từ truyền thông:', options: [ { text: 'Bán tháo nhanh chóng', score: 1 }, { text: 'Lo lắng, chờ thêm thông tin', score: 2 }, { text: 'Xem là cơ hội mua vào', score: 3 } ] },
        { id: 'q32', text: 'Ảnh hưởng từ áp lực bên ngoài (bạn bè, mạng xã hội):', options: [ { text: 'Dễ bị ảnh hưởng, thay đổi chiến lược', score: 1 }, { text: 'Ở mức vừa phải, cố tự chủ', score: 2 }, { text: 'Ít/không, tập trung vào mục tiêu cá nhân', score: 3 } ] },
    ]
  },
  {
    sectionId: 7,
    sectionTitle: "Phần VII: Phân Tích Theo Tình Huống Thực Tế",
    questions: [
        { id: 'q33', text: 'Thị trường giảm 30% trong 2 tuần do khủng hoảng:', options: [ { text: 'Bán tháo để tránh tổn thất', score: 1 }, { text: 'Giữ danh mục, chờ phục hồi', score: 2 }, { text: 'Mua thêm để giảm giá bình quân', score: 3 } ] },
        { id: 'q34', text: 'Kinh tế dự báo phục hồi, thị trường vẫn biến động:', options: [ { text: 'Chuyển sang tài sản an toàn', score: 1 }, { text: 'Giữ nguyên chiến lược, theo dõi', score: 2 }, { text: 'Tăng đầu tư vào tài sản tăng trưởng', score: 3 } ] },
        { id: 'q35', text: 'Dự án mạo hiểm, lợi nhuận cao, thanh khoản thấp (3 năm):', options: [ { text: 'Từ chối để đảm bảo thanh khoản', score: 1 }, { text: 'Đầu tư một phần nhỏ', score: 2 }, { text: 'Đầu tư nếu phù hợp mục tiêu dài hạn', score: 3 } ] },
        { id: 'q36', text: 'Khuyến nghị mua cổ phiếu công ty gặp khó khăn tạm thời:', options: [ { text: 'Bỏ qua, chờ thêm thông tin', score: 1 }, { text: 'Đầu tư một phần nhỏ để thử nghiệm', score: 2 }, { text: 'Tận dụng cơ hội, mua số lượng lớn', score: 3 } ] },
    ]
  }
];

const profileDetails = {
  'Thận trọng': {
    badgeTitle: 'Người Giữ Thành',
    description: 'Bạn là nhà đầu tư ưu tiên sự an toàn và bảo toàn vốn lên hàng đầu. Bạn cảm thấy thoải mái hơn với các khoản đầu tư có rủi ro thấp, lợi nhuận ổn định như trái phiếu chính phủ hoặc tiền gửi tiết kiệm. Biến động thị trường có thể khiến bạn lo lắng.',
    allocation: [ { name: 'Trái phiếu', value: 70 }, { name: 'Cổ phiếu', value: 20 }, { name: 'Tiền mặt', value: 10 }, ],
    nextSteps: ['Xây dựng quỹ dự phòng 6 tháng', 'Tìm hiểu về quỹ trái phiếu', 'Tập trung vào các công ty lớn, ổn định (blue-chip)'],
    risks: ['Rủi ro lạm phát làm xói mòn tài sản', 'Bỏ lỡ các cơ hội tăng trưởng cao', 'Có thể quá an toàn và không đạt mục tiêu dài hạn']
  },
  'Cân bằng': {
    badgeTitle: 'Chiến Lược Gia',
    description: 'Bạn là người tìm kiếm sự hài hòa giữa an toàn và tăng trưởng. Bạn sẵn sàng chấp nhận rủi ro ở mức độ vừa phải để đạt được lợi nhuận cao hơn, nhưng vẫn luôn chú trọng đa dạng hóa danh mục để giảm thiểu biến động.',
    allocation: [ { name: 'Cổ phiếu', value: 50 }, { name: 'Trái phiếu', value: 40 }, { name: 'Tài sản thay thế', value: 10 }, ],
    nextSteps: ['Tìm hiểu về các quỹ chỉ số (ETF/Index Fund)', 'Đa dạng hóa sang các thị trường quốc tế', 'Đánh giá lại danh mục 6 tháng một lần'],
    risks: ['Tâm lý "mua đỉnh bán đáy" khi thị trường biến động', 'Phân bổ tài sản không tối ưu', 'Đôi khi do dự trước các cơ hội tốt']
  },
  'Chấp nhận rủi ro cao': {
    badgeTitle: 'Nhà Mạo Hiểm',
    description: 'Bạn là nhà đầu tư mạnh mẽ, không ngại mạo hiểm để tìm kiếm lợi nhuận đột phá. Bạn bị thu hút bởi các cơ hội tăng trưởng cao như cổ phiếu công nghệ, tiền điện tử và các dự án khởi nghiệp. Bạn có khả năng chịu đựng biến động thị trường tốt.',
    allocation: [ { name: 'Cổ phiếu', value: 70 }, { name: 'Tài sản thay thế / Tiền điện tử', value: 15 }, { name: 'Trái phiếu', value: 15 }, ],
    nextSteps: ['Nghiên cứu sâu về các ngành có tiềm năng tăng trưởng', 'Tìm hiểu về các chiến lược đầu tư nâng cao', 'Xây dựng một "vị thế nhỏ" trong các tài sản siêu rủi ro'],
    risks: ['Rủi ro thua lỗ nặng do tập trung vào tài sản biến động cao', 'Ảnh hưởng bởi tâm lý FOMO (sợ bỏ lỡ)', 'Lạm dụng đòn bẩy tài chính']
  }
};
const calculateRiskProfile = (answers) => {
  const sectionScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  answers.forEach(answer => { if (sectionScores.hasOwnProperty(answer.sectionId)) { sectionScores[answer.sectionId] += answer.score; } });
  const weightedSection3Score = sectionScores[3] * 1.2;
  let finalScore = 0;
  for (const sectionId in sectionScores) {
    if (parseInt(sectionId, 10) === 3) { finalScore += weightedSection3Score; } else { finalScore += sectionScores[sectionId]; }
  }
  finalScore = Math.round(finalScore);
  let profileName = '';
  if (finalScore <= 60) { profileName = 'Thận trọng'; } else if (finalScore <= 85) { profileName = 'Cân bằng'; } else { profileName = 'Chấp nhận rủi ro cao'; }
  const radarChartData = [
      { subject: 'Thông Tin Cá Nhân', score: sectionScores[1] }, { subject: 'Thái Độ Rủi Ro', score: sectionScores[2] },
      { subject: 'Kinh Nghiệm', score: Math.round(weightedSection3Score) }, { subject: 'Tài Chính', score: sectionScores[4] },
      { subject: 'Kỳ Vọng', score: sectionScores[5] }, { subject: 'Tâm Lý', score: sectionScores[6] }, { subject: 'Tình Huống', score: sectionScores[7] },
  ];
  return { finalScore, profile: profileName, details: profileDetails[profileName], radarChartData };
};

const allQuestions = surveySections.flatMap(section => section.questions.map(q => ({ ...q, sectionId: section.sectionId, sectionTitle: section.sectionTitle })));
const TOTAL_QUESTIONS = allQuestions.length;

// --- BƯỚC 2: CÁC COMPONENT GIAO DIỆN ---

const PALETTE = {
    background: '#012D2D', text: '#E0F2E9', primary: '#00FFAB',
    card: 'rgba(255, 255, 255, 0.05)', cardHover: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(0, 255, 171, 0.2)', borderHover: 'rgba(0, 255, 171, 0.7)',
};

const LandingPage = ({ onStart }) => {
    return (
        <div style={{ backgroundColor: PALETTE.background, color: PALETTE.text, minHeight: '100vh', fontFamily: "'Be Vietnam Pro', sans-serif", padding: '40px 20px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1, zIndex: 0 }}></div>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                    <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ fontSize: '3.5em', fontWeight: 'bold' }}>Tự Do Tài Chính Bắt Đầu Từ <span style={{ color: PALETTE.primary }}>Sự Thấu Hiểu</span></motion.h1>
                    <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ fontSize: '1.2em', color: PALETTE.text, marginTop: '20px', maxWidth: '600px', opacity: 0.8 }}>La Bàn Đầu Tư là công cụ giúp bạn khám phá khẩu vị rủi ro, từ đó xây dựng một chiến lược tài chính vững chắc và phù hợp với chính bạn.</motion.p>
                    <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8, type: 'spring' }} whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${PALETTE.primary}` }} onClick={onStart} style={{ backgroundColor: PALETTE.primary, color: PALETTE.background, fontSize: '1.2em', fontWeight: 'bold', padding: '15px 30px', borderRadius: '50px', border: 'none', cursor: 'pointer', marginTop: '40px' }}>Khám Phá Ngay</motion.button>
                </div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} style={{ marginTop: '80px', backgroundColor: PALETTE.card, border: `1px solid ${PALETTE.border}`, padding: '30px', borderRadius: '15px', maxWidth: '800px', width: '100%' }}>
                    <h2 style={{ fontSize: '1.8em', color: PALETTE.primary, textAlign: 'center', marginBottom: '30px' }}>Các Khía Cạnh Đánh Giá</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {surveySections.map((section, index) => (
                            <div key={section.sectionId} style={{ borderBottom: index === surveySections.length - 1 ? 'none' : `1px solid ${PALETTE.border}`, paddingBottom: '15px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: PALETTE.primary, color: PALETTE.background, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>{index + 1}</div>
                                <div><h3 style={{ fontSize: '1.1em', fontWeight: '500' }}>{section.sectionTitle}</h3></div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const LoadingScreen = () => {
    const messages = ["Đang phân tích câu trả lời của bạn...", "Đang định hình hồ sơ tài chính...", "Đang tạo báo cáo cá nhân hóa..."];
    const [messageIndex, setMessageIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => { setMessageIndex(prevIndex => (prevIndex + 1) % messages.length); }, 1200);
        return () => clearInterval(interval);
    }, []);
    return (
        <div style={{ backgroundColor: PALETTE.background, color: PALETTE.text, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            <AnimatePresence mode="wait"><motion.p key={messageIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} style={{ fontSize: '1.5em', opacity: 0.8 }}>{messages[messageIndex]}</motion.p></AnimatePresence>
        </div>
    );
};

// --- Component Đồng hồ đo ĐÃ SỬA LỖI VÀ NÂNG CẤP ---
const GaugeChart = ({ score }) => {
    const minScore = 36;
    const maxScore = 120;
    const scorePercentage = Math.max(0, Math.min(1, (score - minScore) / (maxScore - minScore)));
    const angle = scorePercentage * 180;

    const describeArc = (x, y, radius, startAngle, endAngle) => {
        const start = { x: x + radius * Math.cos(startAngle * Math.PI / 180), y: y + radius * Math.sin(startAngle * Math.PI / 180) };
        const end = { x: x + radius * Math.cos(endAngle * Math.PI / 180), y: y + radius * Math.sin(endAngle * Math.PI / 180) };
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
    };

    return (
        <div style={{ textAlign: 'center', position: 'relative', width: '250px', height: '150px', margin: '0 auto' }}>
            <svg width="250" height="125" viewBox="0 0 250 125">
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#00FFAB" />
                        <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                </defs>
                <path d={describeArc(125, 125, 100, 180, 360)} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="20" />
                <path d={describeArc(125, 125, 100, 180, 180 + angle)} fill="none" stroke="url(#gaugeGradient)" strokeWidth="20" strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', color: PALETTE.text }}>
                <div style={{ fontSize: '2.5em', fontWeight: 'bold' }}>{score}</div>
                <div style={{ fontSize: '1em', opacity: 0.8 }}>Tổng điểm</div>
            </div>
        </div>
    );
};

// --- Component Phân Tích Sâu (MỚI) ---
const AnalysisHighlights = ({ radarData }) => {
    const sortedData = [...radarData].sort((a, b) => a.score - b.score);
    const lowest = sortedData[0];
    const highest = sortedData[sortedData.length - 1];

    return (
        <div style={{ gridColumn: '1 / -1', backgroundColor: PALETTE.card, border: `1px solid ${PALETTE.border}`, padding: '30px', borderRadius: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div>
                <h3 style={{ fontSize: '1.5em', color: PALETTE.primary, marginBottom: '15px' }}>🚀 Điểm Nhấn</h3>
                <p style={{ color: PALETTE.text, fontSize: '1.2em', fontWeight: 'bold' }}>{highest.subject}</p>
                <p style={{ color: PALETTE.text, opacity: 0.8, marginTop: '5px' }}>Điểm số cao trong lĩnh vực này cho thấy bạn có nền tảng vững chắc và sự tự tin, đây là lợi thế lớn trong đầu tư.</p>
            </div>
            <div>
                <h3 style={{ fontSize: '1.5em', color: '#FFD700', marginBottom: '15px' }}>💡 Gợi Ý Phát Triển</h3>
                <p style={{ color: PALETTE.text, fontSize: '1.2em', fontWeight: 'bold' }}>{lowest.subject}</p>
                <p style={{ color: PALETTE.text, opacity: 0.8, marginTop: '5px' }}>Hãy dành thêm thời gian tìm hiểu và trau dồi về khía cạnh này. Cải thiện nó sẽ giúp bạn trở thành một nhà đầu tư toàn diện hơn.</p>
            </div>
        </div>
    );
};


const ResultsPage = ({ result, onRedo }) => {
  const { profile, finalScore, details, radarChartData } = result;
  return (
    <div style={{ backgroundColor: PALETTE.background, color: PALETTE.text, padding: '40px', fontFamily: "'Be Vietnam Pro', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '2.5em', textAlign: 'center', color: PALETTE.primary, marginBottom: '40px' }}>Báo Cáo Hồ Sơ Rủi Ro</motion.h1>
      <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} style={{ width: '100%', maxWidth: '1000px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ gridColumn: '1 / -1', backgroundColor: PALETTE.card, border: `1px solid ${PALETTE.border}`, padding: '30px', borderRadius: '15px', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px', alignItems: 'center' }}>
              <div>
                <GaugeChart score={finalScore} />
                <p style={{ fontSize: '2.5em', color: PALETTE.primary, fontWeight: 'bold', margin: '10px 0', textAlign: 'center' }}>{profile}</p>
              </div>
              <div><h2 style={{ fontSize: '1.8em', color: PALETTE.primary, marginBottom: '10px' }}>Chào mừng {details.badgeTitle},</h2><p style={{ opacity: 0.8, lineHeight: 1.6 }}>{details.description}</p></div>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ backgroundColor: PALETTE.card, border: `1px solid ${PALETTE.border}`, padding: '20px', borderRadius: '15px' }}>
              <h3 style={{ fontSize: '1.2em', color: PALETTE.text, marginBottom: '20px', textAlign: 'center' }}>Gợi Ý Phân Bổ Tài Sản</h3>
              <div style={{ height: '250px' }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={details.allocation} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>{details.allocation.map((entry, index) => <Cell key={`cell-${index}`} fill={['#00FFAB', '#00A896', '#F0F3BD'][index % 3]} />)}</Pie><Tooltip contentStyle={{ backgroundColor: PALETTE.background, borderColor: PALETTE.primary, color: PALETTE.text }} itemStyle={{ color: PALETTE.text }}/></PieChart></ResponsiveContainer></div>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ backgroundColor: PALETTE.card, border: `1px solid ${PALETTE.border}`, padding: '20px', borderRadius: '15px' }}>
              <h3 style={{ fontSize: '1.2em', color: PALETTE.text, marginBottom: '20px', textAlign: 'center' }}>Phân Tích Chi Tiết 7 Khía Cạnh</h3>
              <div style={{ height: '250px' }}><ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarChartData}><PolarGrid stroke={PALETTE.border} /><PolarAngleAxis dataKey="subject" tick={{ fill: PALETTE.text, fontSize: 11, opacity: 0.7 }} /><PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} axisLine={false} /><Radar name="Điểm" dataKey="score" stroke={PALETTE.primary} fill={PALETTE.primary} fillOpacity={0.6} /><Tooltip contentStyle={{ backgroundColor: PALETTE.background, borderColor: PALETTE.primary }} itemStyle={{ color: PALETTE.text }}/></RadarChart></ResponsiveContainer></div>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}><AnalysisHighlights radarData={radarChartData} /></motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} style={{ gridColumn: '1 / -1', backgroundColor: PALETTE.card, border: `1px solid ${PALETTE.border}`, padding: '30px', borderRadius: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div><h3 style={{ fontSize: '1.2em', color: PALETTE.text, marginBottom: '15px' }}>✅ Bước Tiếp Theo</h3><ul style={{ color: PALETTE.text, opacity: 0.8, paddingLeft: '20px' }}>{details.nextSteps.map((step, i) => <li key={i} style={{ marginBottom: '8px' }}>{step}</li>)}</ul></div>
                <div><h3 style={{ fontSize: '1.2em', color: PALETTE.text, marginBottom: '15px' }}>⚠️ Cần Lưu Ý</h3><ul style={{ color: PALETTE.text, opacity: 0.8, paddingLeft: '20px' }}>{details.risks.map((risk, i) => <li key={i} style={{ marginBottom: '8px' }}>{risk}</li>)}</ul></div>
            </motion.div>
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '20px' }}><button onClick={onRedo} style={{ backgroundColor: 'transparent', color: PALETTE.primary, border: `1px solid ${PALETTE.primary}`, padding: '10px 20px', borderRadius: '50px', cursor: 'pointer' }}>Làm Lại Bài Khảo Sát</button></div>
        </div>
      </motion.div>
    </div>
  );
};

const Questionnaire = ({ onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [direction, setDirection] = useState(1);
    const handleAnswerSelect = (question, option) => {
        setDirection(1);
        const newAnswer = { questionId: question.id, sectionId: question.sectionId, score: option.score };
        const existingAnswerIndex = answers.findIndex(a => a.questionId === question.id);
        let updatedAnswers;
        if (existingAnswerIndex > -1) { updatedAnswers = [...answers]; updatedAnswers[existingAnswerIndex] = newAnswer; } else { updatedAnswers = [...answers, newAnswer]; }
        setAnswers(updatedAnswers);
        setTimeout(() => { if (currentQuestionIndex < TOTAL_QUESTIONS - 1) { setCurrentQuestionIndex(currentQuestionIndex + 1); } else { onComplete(updatedAnswers); } }, 300);
    };
    const handleGoBack = () => { if (currentQuestionIndex > 0) { setDirection(-1); setCurrentQuestionIndex(currentQuestionIndex - 1); } };
    const currentQuestion = allQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;
    const currentAnswer = answers.find(a => a.questionId === currentQuestion.id);
    const variants = { enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }), };
    return (
        <div style={{ backgroundColor: PALETTE.background, color: PALETTE.text, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Be Vietnam Pro', sans-serif", padding: '20px', overflow: 'hidden' }}>
            <div style={{ width: '100%', maxWidth: '600px', zIndex: 1 }}>
                <div style={{ marginBottom: '30px' }}>
                    <p style={{ color: PALETTE.text, opacity: 0.7, textAlign: 'center', fontSize: '1.1em', marginBottom: '10px', fontWeight: 400 }}>{currentQuestion.sectionTitle}</p>
                    <div style={{ backgroundColor: PALETTE.card, borderRadius: '10px', height: '10px', marginTop: '10px' }}>
                        <motion.div style={{ backgroundColor: PALETTE.primary, height: '100%', borderRadius: '10px' }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: 'easeInOut' }} />
                    </div>
                </div>
                <div style={{ position: 'relative', height: '400px' }}>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div key={currentQuestionIndex} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: 'spring', stiffness: 300, damping: 30 }} style={{ position: 'absolute', width: '100%' }}>
                            <h3 style={{ fontSize: '2em', marginBottom: '25px', textAlign: 'center', minHeight: '80px', fontWeight: 600 }}>{currentQuestion.text}</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {currentQuestion.options.map((option, index) => { const isSelected = currentAnswer && currentAnswer.score === option.score; return ( <motion.button key={index} onClick={() => handleAnswerSelect(currentQuestion, option)} animate={{ backgroundColor: isSelected ? PALETTE.primary : PALETTE.card, color: isSelected ? PALETTE.background : PALETTE.text, }} whileHover={{ backgroundColor: isSelected ? PALETTE.primary : PALETTE.cardHover, borderColor: PALETTE.borderHover }} style={{ border: `1px solid ${PALETTE.border}`, padding: '15px', borderRadius: '10px', cursor: 'pointer', fontSize: '1em', textAlign: 'left', fontWeight: 500 }}>{option.text}</motion.button> ); })}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                {currentQuestionIndex > 0 && ( <div style={{ textAlign: 'center', marginTop: '20px' }}><button onClick={handleGoBack} style={{ backgroundColor: 'transparent', color: PALETTE.text, opacity: 0.7, border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', zIndex: 1 }}>Quay Lại</button></div> )}
            </div>
        </div>
    );
};


// --- BƯỚC 3: COMPONENT APP CHÍNH ĐỂ QUẢN LÝ CÁC TRẠNG THÁI ---
export default function App() {
  const [appState, setAppState] = useState('landing');
  const [result, setResult] = useState(null);
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap');`;
    document.head.appendChild(style);
  }, []);
  const handleStartSurvey = () => { setAppState('questionnaire'); };
  const handleCompleteSurvey = (finalAnswers) => {
    const finalResult = calculateRiskProfile(finalAnswers);
    setResult(finalResult);
    setAppState('loading');
    setTimeout(() => { setAppState('results'); }, 3600);
  };
  const handleRedoSurvey = () => { setResult(null); setAppState('landing'); };
  switch (appState) {
    case 'questionnaire': return <Questionnaire onComplete={handleCompleteSurvey} />;
    case 'loading': return <LoadingScreen />;
    case 'results': return <ResultsPage result={result} onRedo={handleRedoSurvey} />;
    case 'landing': default: return <LandingPage onStart={handleStartSurvey} />;
  }
}
