# 국군 야전 상황보고체계, ROK Situation Reporting System
![Logo](https://i.ibb.co/VQqT63J/450-300px-300-100px-900-300px.png)

# Table of Contents
1. [프로잭트 소개](#💡프로잭트-소개	)
2. [기능 설명](#📖기능-설명)
3. [컴퓨터 구성 / 필수 조건 안내 (Prerequisites)](#requirements)
4. [기술 스택 (Technique Used) ](#techniques)
5. [설치 안내 (Installation Process) ](#installation)
6. [팀 정보 (Team Information) ](#team)
7. [저작권 및 사용권 정보 (Copyleft / End User License) ](#copyright)


## 📢프로젝트 소개

**🚩문제점 제시**

    "7생활관 전원 코로나 걸렸데. 대대장님께 카톡으로 보고드려"
    "오늘 훈련한 거 사진 찍어서 대대 단톡방에 올려"
    "후임이 다쳤는데 군 전화도 주변에 없네… 어떻게 보고를 하지?"
    "밥이 너무 맛이 없는데 건의를 어떻게 하지? 연대장님께 전화해볼까?" 

대대급 부대 내부에서 용사와 간부 또는 간부 대 간부 간 이용할 효율적고 안전한 보고체계가 없습니다.

- 기존의 온나라 체계를 활용한다 하더라도 국방망에 접속이 불가능한 영외 간부에 대한 호출 및 긴급정비와 같은 상황일 경우, 전파에 어려움이 있어 전화/카카오톡과 같은 서비스를 이용하는 것이 현실입니다. 더불어 용사는 해당 체계 계정조차 생성할 수 없다는 것이 뚜렷한 한계점입니다.
- 부대 내부의 정보는 아무리 사소하더라도 군사기밀입니다. 민간 상용 애플리케이션을 이용하는 것은 사이버 보안에 위배되는 행위이고, 기밀 사항을 실수로 다른 사람에게 전달할 수 있는 위험성이 존재하며, 타사 애플리케이션이 해킹당하면 저장된 자료가 암호화되어있다는 보장도 없습니다. 또한, 사회공학으로 군사기밀이 유출될 위험도 있습니다. 
- 보안성에 문제가 있을 뿐만 아니라, 군에서 원칙적으로 이행되어야 하는 보고체계를 준수하지 않고 보고하는 상황도 많이 발생합니다.
- 이런 문제점들은 군대라는 조직에서 통제능력 상실과, 상황조치에 큰 차질을 초래할 것입니다.


**💡 문제에 대한 해결책**
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


## 📖기능 설명
 - 설명 기입

<a id = "requirements"></a>
## 💻컴퓨터 구성 / 필수 조건 안내
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상

<a id = "techniques"></a>
## 기술 스택 (Technique Used) 

### Server(backend)
 -  nodejs, php, java 등 서버 언어 버전 
 - express, laravel, sptring boot 등 사용한 프레임워크 
 - DB 등 사용한 다른 프로그램 
 
### Frontend
 -  react, vue.js 등 사용한 frontend 프레임워크 
 -  UI framework
 - 기타 사용한 라이브러리

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
	  <td align='center'>역활</td>
	  <td align='center'>GitHub</td>
	  <td align='center'>Contacts</td>
 </tr>
 <tr>
	  <td align='center'><img src="https://i.imgur.com/5NlzJuu_d.webp?maxwidth=760&fidelity=grand" width="50" height="63"></td>
	  <td align='center'>김상영</td>
	  <td align='center'>팀장, 암호와개발</td>
	  <td align='center'><a href="https://github.com/s3kim2018"><img src="http://img.shields.io/badge/s3kim2018-green?style=social&logo=github"/></a></td>
	  <td align='center'><a href="s3kim2018@berkeley.edu"><img src="https://img.shields.io/badge/s3kim2018@berkeley.edu-green?logo=gmail&style=social"/></a></td>
 </tr>
 <tr>
	  <td align='center'><img src="https://cdn-icons-png.flaticon.com/512/6142/6142226.png" width="50" height="63"></td>
	  <td align='center'>최윤성</td>
	  <td align='center'>(Web) 프론트엔드 개발자</td>
	  <td align='center'><a href="https://github.com/marunemo"><img src="http://img.shields.io/badge/marunemo-green?style=social&logo=github"/></a></td>
	  <td align='center'><a href="chys3697@gmail.com"><img src="https://img.shields.io/badge/chys3697@gmail.com-green?logo=gmail&style=social"/></a></td>
 </tr>
 <tr>
	 <td align='center'><img src="https://cdn-icons-png.flaticon.com/512/6142/6142226.png" width="50" height="63"></td>
  <td align='center'>김형민</td>
  <td align='center'>(App) 프론트엔드 개발자</td>
  <td align='center'><a href="https://github.com/gudmin0526"><img src="http://img.shields.io/badge/gudmin0526-green?style=social&logo=github"/></a></td>
  <td align='center'><a href="gudmin0526@gmail.com"><img src="https://img.shields.io/badge/gudmin0526@gmail.com-green?logo=gmail&style=social"/></a></td>
 </tr>
 <tr>
	  <td align='center'><img src="https://cdn-icons-png.flaticon.com/512/6142/6142226.png" width="50" height="63"></td>
	  <td align='center'>조영효</td>
	  <td align='center'>백엔드 개발자</td>
	  <td align='center'><a href="https://github.com/yhcho0405"><img src="http://img.shields.io/badge/yhcho0405-green?style=social&logo=github"/></a></td>
	  <td align='center'><a href="yhcho0405@kakao.com"><img src="https://img.shields.io/badge/yhcho0405@kakao.com-green?logo=gmail&style=social"/></a></td>
 </tr>
</table>


<a id = "copyright"></a>
## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.
