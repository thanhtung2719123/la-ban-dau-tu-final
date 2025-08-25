/**
 * src/constants/questions.js
 * * Đây là "cơ sở dữ liệu" chứa tất cả các câu hỏi, đáp án, và điểm số
 * cho bài khảo sát La Bàn Đầu Tư.
 * Dữ liệu được cấu trúc thành một mảng các "phần" (section),
 * mỗi phần chứa các câu hỏi tương ứng.
 */

export const surveySections = [
  // --- PHẦN I: THÔNG TIN CÁ NHÂN VÀ HỒ SƠ ĐẦU TƯ ---
  {
    sectionId: 1,
    sectionTitle: "Thông Tin Cá Nhân và Hồ Sơ Đầu Tư",
    questions: [
      {
        id: 'q1',
        text: 'Độ tuổi của bạn:',
        options: [
          { text: 'Dưới 30', score: 3 },
          { text: '30 – 45', score: 2 },
          { text: '46 – 60', score: 1 },
          { text: 'Trên 60', score: 1 },
        ],
      },
      {
        id: 'q2',
        text: 'Tình trạng nghề nghiệp và thu nhập:',
        options: [
          { text: 'Khởi nghiệp, thu nhập biến động', score: 3 },
          { text: 'Ổn định, tích lũy tài sản', score: 2 },
          { text: 'Sắp nghỉ hưu, ưu tiên an toàn', score: 1 },
          { text: 'Sinh viên, chưa có thu nhập', score: 0 },
        ],
      },
      {
        id: 'q3',
        text: 'Tình trạng gia đình và trách nhiệm tài chính:',
        options: [
          { text: 'Độc thân, không người phụ thuộc', score: 3 },
          { text: 'Có gia đình, con nhỏ hoặc chăm sóc người thân', score: 2 },
          { text: 'Nhiều trách nhiệm tài chính lớn', score: 1 },
        ],
      },
      {
        id: 'q4',
        text: 'Kế hoạch tài chính trong 5 năm tới:',
        options: [
          { text: 'Tích lũy, đầu tư dài hạn', score: 3 },
          { text: 'Chuẩn bị nhu cầu ngắn hạn (mua nhà, giáo dục)', score: 2 },
          { text: 'Ưu tiên an toàn, bảo toàn vốn', score: 1 },
        ],
      },
      {
        id: 'q5',
        text: 'Trình độ học vấn:',
        options: [
          { text: 'Sau đại học/chuyên môn cao', score: 3 },
          { text: 'Đại học', score: 2 },
          { text: 'Trung học hoặc dưới', score: 1 },
        ],
      },
      {
        id: 'q6',
        text: 'Nguồn thông tin đầu tư chính của bạn:',
        options: [
          { text: 'Tự nghiên cứu hoặc công cụ phân tích tự động', score: 3 },
          { text: 'Tư vấn chuyên gia hoặc diễn đàn đầu tư', score: 2 },
          { text: 'Dựa vào người quen hoặc truyền thông', score: 1 },
        ],
      },
    ],
  },
  // --- PHẦN II: THÁI ĐỘ VỚI RỦI RO VÀ PHẢN ỨNG THỊ TRƯỜNG ---
  {
    sectionId: 2,
    sectionTitle: "Thái Độ Với Rủi Ro và Phản Ứng Thị Trường",
    questions: [
      {
        id: 'q7',
        text: 'Ưu tiên đầu tư của bạn:',
        options: [
          { text: 'Bảo toàn vốn tuyệt đối', score: 1 },
          { text: 'Tăng trưởng ổn định, rủi ro vừa phải', score: 2 },
          { text: 'Lợi nhuận cao, chấp nhận rủi ro lớn', score: 3 },
        ],
      },
      {
        id: 'q8',
        text: 'Nếu danh mục đầu tư giảm 20% trong 1–2 tuần:',
        options: [
          { text: 'Bán tháo để cắt lỗ', score: 1 },
          { text: 'Giữ nguyên, theo dõi thị trường', score: 2 },
          { text: 'Mua thêm để tận dụng giá thấp', score: 3 },
        ],
      },
      {
        id: 'q9',
        text: 'Khi nghe về cơ hội đầu tư lợi suất cao, rủi ro lớn:',
        options: [
          { text: 'Cân nhắc kỹ, thu thập thông tin', score: 1 },
          { text: 'Đầu tư một phần nhỏ để thử nghiệm', score: 2 },
          { text: 'Đầu tư mạnh nếu thấy tiềm năng', score: 3 },
        ],
      },
      {
        id: 'q10',
        text: 'Mức độ thoải mái với biến động thị trường:',
        options: [
          { text: 'Lo lắng, dễ bị ảnh hưởng', score: 1 },
          { text: 'Chấp nhận biến động vừa phải', score: 2 },
          { text: 'Bình tĩnh, tin tưởng chiến lược dài hạn', score: 3 },
        ],
      },
      {
        id: 'q11',
        text: 'Sẵn sàng đầu tư vào tài sản mới (tiền điện tử, NFT):',
        options: [
          { text: 'Không, chỉ đầu tư tài sản truyền thống', score: 1 },
          { text: 'Có, chiếm phần nhỏ danh mục', score: 2 },
          { text: 'Rất sẵn sàng, tin vào tiềm năng', score: 3 },
        ],
      },
      {
        id: 'q12',
        text: 'Nguồn thông tin ra quyết định đầu tư:',
        options: [
          { text: 'Dựa vào một nguồn duy nhất', score: 1 },
          { text: 'Tham khảo 2–3 nguồn', score: 2 },
          { text: 'Phân tích từ nhiều nguồn, tự quyết định', score: 3 },
        ],
      },
    ],
  },
  // --- PHẦN III: KINH NGHIỆM VÀ KIẾN THỨC ĐẦU TƯ ---
  {
    sectionId: 3,
    sectionTitle: "Kinh Nghiệm và Kiến Thức Đầu Tư",
    questions: [
      {
        id: 'q13',
        text: 'Thời gian tham gia đầu tư:',
        options: [
          { text: 'Dưới 1 năm', score: 1 },
          { text: '1–3 năm', score: 3 },
          { text: 'Trên 3 năm', score: 5 },
        ],
      },
      {
        id: 'q14',
        text: 'Loại hình tài sản bạn thường đầu tư:',
        options: [
          { text: 'Tài sản an toàn (tiền gửi, trái phiếu chính phủ)', score: 1 },
          { text: 'Tài sản trung bình (trái phiếu doanh nghiệp, quỹ hỗn hợp)', score: 3 },
          { text: 'Tài sản rủi ro cao (cổ phiếu, tiền điện tử)', score: 5 },
        ],
      },
      {
        id: 'q15',
        text: 'Hiểu biết về khái niệm đầu tư (đa dạng hóa, beta, alpha):',
        options: [
          { text: 'Rất ít', score: 1 },
          { text: 'Ít', score: 2 },
          { text: 'Trung bình', score: 3 },
          { text: 'Tương đối cao', score: 4 },
          { text: 'Rất cao', score: 5 },
        ],
      },
      {
        id: 'q16',
        text: 'Phương pháp phân tích đầu tư chính:',
        options: [
          { text: 'Theo lời khuyên/xu hướng thị trường', score: 1 },
          { text: 'Phân tích cơ bản hoặc kỹ thuật', score: 3 },
          { text: 'Kết hợp nhiều phương pháp/công cụ tự động', score: 5 },
        ],
      },
      {
        id: 'q17',
        text: 'Tần suất tham gia khóa học, hội thảo đầu tư:',
        options: [
          { text: 'Rất ít/không bao giờ', score: 1 },
          { text: 'Thỉnh thoảng', score: 3 },
          { text: 'Thường xuyên', score: 5 },
        ],
      },
      {
        id: 'q18',
        text: 'Tần suất tham gia cộng đồng, diễn đàn đầu tư:',
        options: [
          { text: 'Không bao giờ', score: 1 },
          { text: 'Thỉnh thoảng', score: 3 },
          { text: 'Thường xuyên', score: 5 },
        ],
      },
    ],
  },
  // --- PHẦN IV: TÌNH HÌNH TÀI CHÍNH VÀ KHẢ NĂNG THANH KHOẢN ---
  {
    sectionId: 4,
    sectionTitle: "Tình Hình Tài Chính và Khả Năng Thanh Khoản",
    questions: [
      {
        id: 'q19',
        text: 'Tình trạng tài chính cá nhân:',
        options: [
          { text: 'Thu nhập không đều, quỹ dự phòng dưới 3 tháng', score: 1 },
          { text: 'Thu nhập ổn định, quỹ dự phòng 3–6 tháng', score: 2 },
          { text: 'Thu nhập ổn định, quỹ dự phòng trên 6 tháng', score: 3 },
        ],
      },
      {
        id: 'q20',
        text: 'Phần trăm tài sản đầu tư vào sản phẩm rủi ro cao:',
        options: [
          { text: 'Dưới 10%', score: 1 },
          { text: '10%–30%', score: 2 },
          { text: 'Trên 30%', score: 3 },
        ],
      },
      {
        id: 'q21',
        text: 'Thái độ với đòn bẩy tài chính:',
        options: [
          { text: 'Tránh sử dụng, ưu tiên vốn tự có', score: 1 },
          { text: 'Sử dụng vừa phải nếu lợi suất cao', score: 2 },
          { text: 'Sử dụng mạnh để tối đa hóa lợi nhuận', score: 3 },
        ],
      },
      {
        id: 'q22',
        text: 'Khả năng thanh khoản của danh mục đầu tư:',
        options: [
          { text: 'Ưu tiên thanh khoản cao', score: 3 },
          { text: 'Kết hợp thanh khoản cao và dài hạn', score: 2 },
          { text: 'Chủ yếu đầu tư dài hạn, thanh khoản thấp', score: 1 },
        ],
      },
      {
        id: 'q23',
        text: 'Quỹ dự phòng tài chính riêng biệt:',
        options: [
          { text: 'Không có', score: 1 },
          { text: 'Có, dưới 3–6 tháng chi tiêu', score: 2 },
          { text: 'Có, đủ trên 6 tháng chi tiêu', score: 3 },
        ],
      },
      {
        id: 'q24',
        text: 'Khả năng tiếp cận nguồn tài chính bổ sung (vay, tín dụng):',
        options: [
          { text: 'Không, chỉ dùng vốn tự có', score: 1 },
          { text: 'Có, trong trường hợp khẩn cấp', score: 2 },
          { text: 'Dễ dàng tiếp cận khi cần', score: 3 },
        ],
      },
    ],
  },
  // --- PHẦN V: KỲ VỌNG VÀ MỤC TIÊU ĐẦU TƯ ---
  {
    sectionId: 5,
    sectionTitle: "Kỳ Vọng và Mục Tiêu Đầu Tư",
    questions: [
      {
        id: 'q25',
        text: 'Mức lợi nhuận kỳ vọng hàng năm:',
        options: [
          { text: 'Bằng với lãi suất tiền gửi kỳ hạn 1 năm', score: 1 },
          { text: '1-2 lần lãi suất tiền gửi kỳ hạn 1 năm', score: 2 },
          { text: 'Gấp nhiều lần lãi suất tiền gửi', score: 3 },
        ],
      },
      {
        id: 'q26',
        text: 'Khả năng điều chỉnh mục tiêu khi thị trường biến động:',
        options: [
          { text: 'Khó, giữ chiến lược ban đầu', score: 1 },
          { text: 'Có thể điều chỉnh dựa trên phân tích', score: 2 },
          { text: 'Linh hoạt thay đổi theo thị trường', score: 3 },
        ],
      },
      {
        id: 'q27',
        text: 'Cân bằng rủi ro và lợi nhuận trong chiến lược:',
        options: [
          { text: 'Ưu tiên an toàn, lợi nhuận thấp', score: 1 },
          { text: 'Cân bằng an toàn và tăng trưởng', score: 2 },
          { text: 'Chấp nhận rủi ro cao để tối đa hóa lợi nhuận', score: 3 },
        ],
      },
      {
        id: 'q28',
        text: 'Thói quen đánh giá rủi ro trước khi đầu tư:',
        options: [
          { text: 'Dựa vào cảm nhận/xu hướng', score: 1 },
          { text: 'Sử dụng một vài chỉ số cơ bản', score: 2 },
          { text: 'Phân tích hệ thống (định lượng, định tính)', score: 3 },
        ],
      },
    ],
  },
  // --- PHẦN VI: YẾU TỐ HÀNH VI VÀ TÂM LÝ ---
  {
    sectionId: 6,
    sectionTitle: "Yếu Tố Hành Vi và Tâm Lý",
    questions: [
      {
        id: 'q29',
        text: 'Cảm xúc khi đối mặt tổn thất đầu tư:',
        options: [
          { text: 'Lo lắng, dễ bị ảnh hưởng', score: 1 },
          { text: 'Không thoải mái nhưng kiểm soát được', score: 2 },
          { text: 'Bình tĩnh, tin tưởng chiến lược dài hạn', score: 3 },
        ],
      },
      {
        id: 'q30',
        text: 'Ảnh hưởng bởi xu hướng “chạy theo đám đông” (FOMO):',
        options: [
          { text: 'Rất dễ bị cuốn theo', score: 1 },
          { text: 'Có ảnh hưởng nhưng cố kiểm soát', score: 2 },
          { text: 'Ít/không, dựa vào nghiên cứu cá nhân', score: 3 },
        ],
      },
      {
        id: 'q31',
        text: 'Phản ứng với tin tức tiêu cực từ truyền thông:',
        options: [
          { text: 'Bán tháo nhanh chóng', score: 1 },
          { text: 'Lo lắng, chờ thêm thông tin', score: 2 },
          { text: 'Xem là cơ hội mua vào', score: 3 },
        ],
      },
      {
        id: 'q32',
        text: 'Ảnh hưởng từ áp lực bên ngoài (bạn bè, mạng xã hội):',
        options: [
          { text: 'Dễ bị ảnh hưởng, thay đổi chiến lược', score: 1 },
          { text: 'Ở mức vừa phải, cố tự chủ', score: 2 },
          { text: 'Ít/không, tập trung vào mục tiêu cá nhân', score: 3 },
        ],
      },
    ],
  },
  // --- PHẦN VII: PHÂN TÍCH THEO TÌNH HUỐNG THỰC TẾ ---
  {
    sectionId: 7,
    sectionTitle: "Phân Tích Theo Tình Huống Thực Tế",
    questions: [
      {
        id: 'q33',
        text: 'Thị trường giảm 30% trong 2 tuần do khủng hoảng:',
        options: [
          { text: 'Bán tháo để tránh tổn thất', score: 1 },
          { text: 'Giữ danh mục, chờ phục hồi', score: 2 },
          { text: 'Mua thêm để giảm giá bình quân', score: 3 },
        ],
      },
      {
        id: 'q34',
        text: 'Kinh tế dự báo phục hồi, thị trường vẫn biến động:',
        options: [
          { text: 'Chuyển sang tài sản an toàn', score: 1 },
          { text: 'Giữ nguyên chiến lược, theo dõi', score: 2 },
          { text: 'Tăng đầu tư vào tài sản tăng trưởng', score: 3 },
        ],
      },
      {
        id: 'q35',
        text: 'Dự án mạo hiểm, lợi nhuận cao, thanh khoản thấp (3 năm):',
        options: [
          { text: 'Từ chối để đảm bảo thanh khoản', score: 1 },
          { text: 'Đầu tư một phần nhỏ', score: 2 },
          { text: 'Đầu tư nếu phù hợp mục tiêu dài hạn', score: 3 },
        ],
      },
      {
        id: 'q36',
        text: 'Khuyến nghị mua cổ phiếu công ty gặp khó khăn tạm thời:',
        options: [
          { text: 'Bỏ qua, chờ thêm thông tin', score: 1 },
          { text: 'Đầu tư một phần nhỏ để thử nghiệm', score: 2 },
          { text: 'Tận dụng cơ hội, mua số lượng lớn', score: 3 },
        ],
      },
    ],
  },
];
