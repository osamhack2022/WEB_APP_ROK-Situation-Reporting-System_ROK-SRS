![Logo](https://i.ibb.co/PmQxT82/450-300px-300-100px-900-300px.png)

---
1. [프로젝트 소개](#introduction)
2. [기능 설명](#features)
3. [컴퓨터 구성 / 필수 조건 안내 (Prerequisites)](#requirements)
4. [기술 스택 (Technique Used) ](#techniques)
5. [설치 안내 (Installation Process) ](#installation)
6. [팀 정보 (Team Information) ](#team)
7. [저작권 및 사용권 정보 (Copyleft / End User License) ](#copyright)

<a id = "introduction"></a>
## 📢 프로젝트 소개

**🚩 문제점**

  >  "7생활관 전원 코로나 걸렸대, 대대장님께 카톡으로 보고드려."
  
  >  "오늘 훈련한 거 사진 찍어서 대대 단톡방에 올려."
  
  >  "후임이 다쳤는데 군 전화도 주변에 없네… 어떻게 보고를 하지?"
  
  >  "밥이 너무 맛이 없는데 건의를 어떻게 하지? 연대장님께 전화해볼까?"

대대급 부대 내부에서 용사와 간부 또는 간부 대 간부 간 이용할 효율적이고 안전한 보고체계가 없습니다.

- 기존의 온나라 체계를 이용한다 하더라도 국방망에 접속이 불가능한 영외 간부에 대한 호출 및 긴급정비와 같은 상황일 경우, 전파에 어려움이 있어 전화/카카오톡과 같은 서비스를 이용하는 것이 현실입니다. 더불어 용사는 해당 체계 계정조차 생성할 수 없다는 것이 뚜렷한 한계점입니다.
- 부대 내부의 정보는 아무리 사소하더라도 군사기밀입니다. 민간 상용 애플리케이션을 이용하는 것은 사이버 보안에 위배되는 행위이고, 기밀 사항을 실수로 다른 사람에게 전달할 수 있는 위험성이 존재하며, 타사 애플리케이션이 해킹당하면 저장된 자료가 암호화되어있다는 보장도 없습니다. 또한, 사회공학으로 군사기밀이 유출될 위험도 있습니다.
- 보안성에 문제가 있을 뿐만 아니라, 군에서 원칙적으로 이행되어야 하는 보고체계를 준수하지 않고 보고하는 상황도 많이 발생합니다.
- 이런 문제점들은 군대라는 조직에서 통제능력 상실과, 상황조치에 큰 차질을 초래할 것입니다.

**💡 해결책**

- 부대 내의 모든 전파사항은 암호문 비구별성 원칙(IND-CPA)에 따라 암호화되며 무결성과 기밀성을 보장합니다.
- 케르크호프스의 원리에 따라서 키값이 노출되지 않는 한 보안성이 보장되어, 국군 보안사고를 원천 차단하는 것이 목표입니다.

- [x] 부대에서 긴급상황을 보고체계에 맞추어 보고할 수 있는 애플리케이션
- [x] 보고받은 상황을 암호와 하여 정보를 보호하는 애플리케이션

국군 야전 상황보고체계 (ROK Situation Reporting System)은 위에 나열된 문제에 대한 해결책이 될 것입니다.
상황이 상급 보고체계에 보고되기 전 각 부대 (여단, 대대, 독립중대) 지휘통제실에서 상황을 종합하고 지시사항을 하달하는 C4I 체계가 될 것입니다.
![Logo](https://i.ibb.co/2KDTRCD/Blank-board.png)

- 규정에 입각한 체계적인 보고체계를 준수하여 보고되어 상황조치 능력을 향상시킬 수 있다.
- 메모보고 기능으로 보고체계를 따르는 상황 보고를 올릴 수 있다.
- 채팅으로 긴급한 사항을 설명하고 추가 지시사항을 받을 수 있다.
- 저장된 부대 메모보고, 보고체계는 부대장이 관리하고 개선할 수 있다.
- 모든 보고사항은 암호와되며 기밀성과 무결성을 보장한다.

**💸 목표 시장**

1. 독립중대, 대대, 단, 연대단위 군부대.
2. 군사경찰 부대.
3. 사령부 내부 부서/처.
4. 국정원, 경호원, 무기체계 개발팀 등 기밀 사항 연구 보직.

<a id = "features"></a>

## 📖 기능 설명

### 🔒 강력한 암호화

<table>
	<tr>
		<td align='center'>
			<img src="https://i.ibb.co/M2cbbWx/Symmetric-Encryption-1.png" />
		</td>
	</tr>
	<tr>
		<td align='center'><b>데이터베이스 객체 암호화</b></td>
	</tr>
	<tr>
		<td align='center' style = "text-align: center">
		대칭 암호화 체계를 이용해 데이터베이스 객체의 모든 항목을 암호화합니다. <br>
		암호화 키값은 키값 저장소에 안전하게 저장됩니다. 
		</td>
	</tr>
</table>

<table>
	<tr>
		<td align='center'>
			<img src="https://i.ibb.co/TLxbnph/Blank-diagram.png" />
		</td>
	</tr>
	<tr>
		<td align='center'><b>통신 암호화</b></td>
	</tr>
	<tr>
		<td align='center' style = "text-align: center">
		비대칭 암호화 체계를 이용해 군인들이 주고받는 메세지와 메모보고를 암호화합니다. <br>
		군인의 공개키값으로 통신 키를 암호화한 후, 군인이 비공개키값으로 키를 해독 할 수 있습니다. <br>
		암호화 키값은 키값 저장소에 안전하게 저장됩니다. 
		</td>
	</tr>
</table>


- 설명 기입

<a id = "requirements"></a>

## 💻컴퓨터 구성 / 필수 조건 안내

- ECMAScript 6 지원 브라우저 사용
- 권장: Google Chrome 버전 77 이상

<a id = "techniques"></a>

## 기술 스택 (Technique Used)

### Web Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)

### Mobile Frontend

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)

### Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Firebase](https://img.shields.io/badge/firebase-2C384A?style=for-the-badge&logo=firebase&logoColor=FFCA28)


### Database

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)

### Collaboration Tools

![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE)

### Encryption Scheme

<table>
<tr>
	  <td align='center'>Logo</td>
	  <td align='center'>Name/Encryption Scheme</td>
	  <td align='center'>Purpose</td>
 </tr>
 <tr>
	  <td align='center'><img src = "https://upload.wikimedia.org/wikipedia/commons/2/2a/RSA_Security_logo2.svg" width = "55px" height = "30px"></td>
	  <td align='center'>RSA</td>
	  <td align='center'>비대칭 암호화 (암호화된 키 값 전송)</td>

 </tr>
  <tr>
	  <td align='center'><img src = "https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=1,format=auto/https%3A%2F%2F1252457264-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-LVOh1OI8lhWfR_994H2%252Favatar.png%3Fgeneration%3D1546620224707409%26width="60%" height="60%" style="max-width: 100%" alt%3Dmedia" width = "40px" height = "40px"></td>
	  	  <td align='center'>Crypto.js</td>
	  <td align='center'>대칭 암호화 기능 (AES, HMAC)</td>

 </tr>
   <tr>
	  <td align='center'><img src = "https://miro.medium.com/max/251/1*YUlYnXhu4NG61i-HRG50AQ.jpeg" width = "40px" height = "40px"></td>
	  	  <td align='center'>Azure Keystore</td>
	  <td align='center'>비밀 키 값 (Secret Key) 저장</td>
 </tr>
</table>

### Open Source
* cookies-next
* react-draggable
* react-firebase-hooks
* react-infinite-scroll-component
* react-organizational-chart
* crypto-js
* uuid
* jose

<a id="functions"></a>

## ⚙️화면 설계

<table>
	<tr>
		<td></td>
		<td></td>
	</tr>
	<tr>
		<td><img src="https://user-images.githubusercontent.com/68419358/198865106-c2e2b9bb-fa81-46f6-95b9-b1b3f04b0d16.PNG" width="60%" height="60%" style="max-width: 100%" alt="로그인페이지" /></td>
		<td>기등록된 사용자의 로그인 지원</td>
	</tr>
	<tr>
		<td><img src="https://user-images.githubusercontent.com/68419358/198865117-f317810b-84e0-49e0-bd40-7528d2b60b2f.PNG" width="60%" height="60%" style="max-width: 100%" alt="회원가입페이지" /></td>
		<td>부대로부터 초대 코드를 받은 장병에 한해 회원가입 허용</td>
	</tr>
	<tr>
		<td><img src="https://user-images.githubusercontent.com/68419358/198865116-1bfcc644-bba5-44d4-a06e-0a4941f7df35.PNG" width="60%" height="60%" style="max-width: 100%" alt="홈페이지" /></td>
		<td>자신의 유저 정보 / 부대 정보 / 메모 보고 확인</td>
	</tr>
	<tr>
		<td><img src="https://user-images.githubusercontent.com/68419358/198865115-28fae6bd-05c2-41a8-8210-4ded72920aff.PNG" width="60%" height="60%" style="max-width: 100%" alt="조직도페이지" /></td>
		<td>같은 부대 내 장병들의 조직 체계 조회</td>
	</tr>
	<tr>
		<td><img src="https://user-images.githubusercontent.com/68419358/198865114-3132c66d-24cc-4a24-aabe-059f747947dc.PNG" width="60%" height="60%" style="max-width: 100%" alt="조직도세부페이지" /></td>
		<td>조직도 내 장병의 세부 정보 확인 / 권한에 따라 추가·수정·삭제 기능 부여</td>
	</tr>
	<tr>
		<td><img src="https://user-images.githubusercontent.com/68419358/198865108-41b5865a-2881-4c8a-b9d0-e73ae721bf4c.PNG" width="60%" height="60%" style="max-width: 100%" alt="메모보고페이지" /></td>
		<td>보고 체계를 따르는 군 내 메모보고 조회</td>
	</tr>
	<tr>
		<td><img src="https://user-images.githubusercontent.com/68419358/198865107-79daa5ba-7cfb-4046-9440-50e401bfc4d0.PNG" width="60%" height="60%" style="max-width: 100%" alt="메모보고작성창" /></td>
		<td>메모보고 업로드 기능</td>
	</tr>
	<tr>
		<td><img src="https://user-images.githubusercontent.com/68419358/198865109-92b6de7a-c973-44a8-b8d0-b191b65725d9.PNG" width="60%" height="60%" style="max-width: 100%" alt="메세지페이지" /></td>
		<td>기존의 통신 수단을 대체할 수 있는 채팅 서비스 구축 / 강력한 암호화 적용</td>
	</tr>
	<tr>
		<td><img src="https://user-images.githubusercontent.com/68419358/198865106-c2e2b9bb-fa81-46f6-95b9-b1b3f04b0d16.PNG" width="60%" height="60%" style="max-width: 100%" alt="계정설정페이지" /></td>
		<td>서비스 내에서 사용되는 유저의 정보 확인</td>
	</tr>
	<tr>
		<td><img src="https://user-images.githubusercontent.com/68419358/198865113-e9ab9427-70b2-49dd-a8cc-5c40ef048830.PNG" width="60%" height="60%" style="max-width: 100%" alt="부대설정페이지" /></td>
		<td>자신이 속한 부대 정보 조회 / 권한에 따라 추가·수정·삭제 기능 부여</td>
	</tr>
	<tr>
		<td><img src="https://user-images.githubusercontent.com/68419358/198865111-a04cf9e3-a88d-491b-b925-9b8efdf1cd4e.PNG" width="60%" height="60%" style="max-width: 100%" alt="보고체계설정페이지" /></td>
		<td>상황 보고 단계에 대한 보고체계 리스트 / 권한에 따라 추가·수정·삭제 기능 부여</td>
	</tr>
	<tr><td></td><td></td></tr>
</table>

<a id = "installation"></a>

## 설치 안내 (Installation Process)

```bash
$ git clone git주소
$ yarn or npm install
$ yarn start or npm run start
```

## 프로젝트 사용법 (Getting Started)

**마크다운 문법을 이용하여 자유롭게 기재**

<a id = "team"></a>

## 팀 정보 (Team Information)

<table>
 <tr>
	  <td></td>
	  <td align='center'>이름</td>
	  <td align='center'>역할</td>
	  <td align='center'>GitHub</td>
	  <td align='center'>Contacts</td>
 </tr>
 <tr>
	  <td align='center'><img src="https://i.imgur.com/5NlzJuu_d.webp?maxwidth=760&fidelity=grand" width="50" height="63"></td>
	  <td align='center'>김상영</td>
	  <td align='center'>팀장, 암호화 개발자</td>
	  <td align='center'><a href="https://github.com/s3kim2018"><img src="http://img.shields.io/badge/s3kim2018-green?style=social&logo=github"/></a></td>
	  <td align='center'><a href="s3kim2018@berkeley.edu"><img src="https://img.shields.io/badge/s3kim2018@berkeley.edu-green?logo=gmail&style=social"/></a></td>
 </tr>
 <tr>
	  <td align='center'><img src="https://user-images.githubusercontent.com/68419358/197472945-18b649a8-3c68-48a8-9f6a-15506f0068a6.jpg" width="50" height="63"></td>
	  <td align='center'>최윤성</td>
	  <td align='center'>프론트엔드(WEB) 개발자</td>
	  <td align='center'><a href="https://github.com/marunemo"><img src="http://img.shields.io/badge/marunemo-green?style=social&logo=github"/></a></td>
	  <td align='center'><a href="chys3697@gmail.com"><img src="https://img.shields.io/badge/chys3697@gmail.com-green?logo=gmail&style=social"/></a></td>
 </tr>
 <tr>
	 <td align='center'><img src="https://cdn-icons-png.flaticon.com/512/6142/6142226.png" width="50" height="63"></td>
  <td align='center'>김형민</td>
  <td align='center'>프론트엔드(APP) 개발자</td>
  <td align='center'><a href="https://github.com/gudmin0526"><img src="http://img.shields.io/badge/gudmin0526-green?style=social&logo=github"/></a></td>
  <td align='center'><a href="gudmin0526@gmail.com"><img src="https://img.shields.io/badge/gudmin0526@gmail.com-green?logo=gmail&style=social"/></a></td>
 </tr>
 <tr>
	  <td align='center'><img src="https://user-images.githubusercontent.com/52823519/195992813-c10b8189-7a98-4e8c-8f08-53ef9cdb7803.png" width="50" height="63"></td>
	  <td align='center'>조영효</td>
	  <td align='center'>백엔드 개발자</td>
	  <td align='center'><a href="https://github.com/yhcho0405"><img src="http://img.shields.io/badge/yhcho0405-green?style=social&logo=github"/></a></td>
	  <td align='center'><a href="yhcho0405@kakao.com"><img src="https://img.shields.io/badge/yhcho0405@kakao.com-green?logo=gmail&style=social"/></a></td>
 </tr>
</table>

<a id = "copyright"></a>

## 저작권 및 사용권 정보 (Copyleft / End User License)

- [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.
