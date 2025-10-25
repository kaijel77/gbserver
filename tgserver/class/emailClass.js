const nodemailer = require('nodemailer'); // 이메일 전송을 위한 nodemailer 모듈 불러오기

class emailsend {
   constructor() {
      if (this.instance) {
         return this.instance;
      }


      this.instance = this;
      return this.instance;
   }

   async send({ to, subject, html }) {

      // 이메일 전송을 위한 메일 서버 연결
      const transporter = nodemailer.createTransport({
         service:'gmail',
         auth: { // 이메일 서버 인증을 위한 사용자의 이메일 주소와 비밀번호
            user: 'kaijel77@gmail.com', // 이메일 주소
            pass: 'uvgx etct tfmi pchg', // 이메일 비밀번호 (그대로 노출되기 때문에 구글의 app 패스워드를 사용할 것을 추천한다.)
         },
      });

      // 메일 옵션 설정
      const mailOptions = {
         from: 'kaijel77@gmail.com',
         to,
         subject,
         html, 
      };

      // 이메일 전송
      await transporter.sendMail(mailOptions);
   }

   async message(id, password) {

      await this.send({
         to: 'kaijel77@naver.com',
         subject: '[IM] 계정 비밀번호',
         html: `<h1>이메일에 따른 회원정보 전달 </h1>
          <div>
            회원님의 계정은 [${id}]입니다..<br>
            회원님의 비밀번호는 [${password}]입니다..<br>
          </div>`,
     });
   };
}

module.exports = new emailsend();