/**
 * src/utils/scoring.js
 * * Đây là "bộ não" của ứng dụng, chịu trách nhiệm tính toán điểm số
 * và phân loại hồ sơ rủi ro dựa trên câu trả lời của người dùng.
 */

/**
 * Tính toán điểm số cuối cùng và xác định hồ sơ rủi ro của người dùng.
 * @param {Array<Object>} answers - Một mảng chứa các câu trả lời của người dùng.
 * Mỗi câu trả lời là một đối tượng có dạng: { questionId, sectionId, score }.
 * @returns {Object} - Một đối tượng chứa kết quả phân tích chi tiết.
 */
export const calculateRiskProfile = (answers) => {
  // Khởi tạo một đối tượng để lưu điểm cho từng phần
  const sectionScores = {
    1: 0, // Thông tin cá nhân
    2: 0, // Thái độ với rủi ro
    3: 0, // Kinh nghiệm & Kiến thức
    4: 0, // Tình hình tài chính
    5: 0, // Kỳ vọng & Mục tiêu
    6: 0, // Yếu tố hành vi
    7: 0, // Tình huống thực tế
  };

  // Vòng lặp: đi qua từng câu trả lời của người dùng để cộng điểm
  answers.forEach(answer => {
    // Kiểm tra xem sectionId có hợp lệ không rồi mới cộng điểm
    if (sectionScores.hasOwnProperty(answer.sectionId)) {
      sectionScores[answer.sectionId] += answer.score;
    }
  });

  // --- ÁP DỤNG QUY TẮC ĐẶC BIỆT ---
  // Theo yêu cầu, điểm của Phần III (Kinh nghiệm & Kiến thức) sẽ được nhân với trọng số 1.2
  const weightedSection3Score = sectionScores[3] * 1.2;

  // Tính tổng điểm cuối cùng bằng cách cộng điểm của tất cả các phần
  // (sử dụng điểm đã nhân trọng số của phần 3)
  let finalScore = 0;
  for (const sectionId in sectionScores) {
    if (parseInt(sectionId, 10) === 3) {
      finalScore += weightedSection3Score;
    } else {
      finalScore += sectionScores[sectionId];
    }
  }

  // Làm tròn điểm số cuối cùng về số nguyên gần nhất
  finalScore = Math.round(finalScore);

  // --- PHÂN LOẠI HỒ SƠ DỰA TRÊN ĐIỂM SỐ ---
  let profileName = '';
  if (finalScore <= 60) {
    profileName = 'Thận trọng';
  } else if (finalScore <= 85) {
    profileName = 'Cân bằng';
  } else {
    // Điểm từ 86 trở lên
    profileName = 'Chấp nhận rủi ro cao';
  }

  // Chuẩn bị dữ liệu để vẽ biểu đồ radar trên trang kết quả
  const radarChartData = [
      { subject: 'Thông Tin Cá Nhân', score: sectionScores[1] },
      { subject: 'Thái Độ Rủi Ro', score: sectionScores[2] },
      { subject: 'Kinh Nghiệm', score: Math.round(weightedSection3Score) }, // Dùng điểm đã nhân trọng số
      { subject: 'Tài Chính', score: sectionScores[4] },
      { subject: 'Kỳ Vọng', score: sectionScores[5] },
      { subject: 'Tâm Lý', score: sectionScores[6] },
      { subject: 'Tình Huống', score: sectionScores[7] },
  ];

  // Trả về một gói dữ liệu hoàn chỉnh
  return {
    finalScore,       // Điểm số cuối cùng
    profile: profileName, // Tên hồ sơ (Thận trọng, Cân bằng,...)
    sectionScores,    // Điểm chi tiết của từng phần (chưa nhân trọng số)
    radarChartData,   // Dữ liệu cho biểu đồ radar
  };
};
