# 프로젝트 컨텍스트 문서
> 새 대화를 시작할 때 이 파일 내용을 Claude에게 붙여넣으세요.
> 작업이 끝날 때마다 이 문서를 업데이트해주세요.

---

## 프로젝트 개요

개인 전문가 소개용 랜딩페이지 + 학교 목록 관리 시스템 + 손해사정사 등록 데이터 분석

**구조:** 정적 HTML + Vercel 배포 + Google Apps Script API + Google Sheets DB + Supabase DB

---

## 주요 정보

| 항목 | 값 |
|------|-----|
| 도메인 | minsl.com |
| GitHub | https://github.com/namu3131/frog-professor-site |
| Vercel | frog-professor-site.vercel.app |
| Supabase 프로젝트 | frog-professor |
| Supabase URL | https://loajiapmephhpzllswiv.supabase.co |
| Supabase Publishable Key | (로컬 보관 - GitHub에 올리지 않음) |
| Supabase Secret Key | (로컬 보관 - GitHub에 올리지 않음) |
| Google Analytics ID | G-XQLQFX3XG8 |
| Microsoft Clarity ID | vuezgi9r19 |
| Apps Script URL | https://script.google.com/macros/s/AKfycbzOX9sWIZiUuTygyhyU2cmY2Tx68b4beinZQ5TjsGQd_sJ9J1b1OcUrcc_XRhautc1e/exec |

---

## 파일 구조

```
frog-professor-site-main/
├── index.html        # 메인 랜딩페이지
├── list.html         # 노무사·세무사 사무소 목록 (Google Sheets)
├── list2.html        # 학교 목록 (Supabase)
├── admin/map.html    # 관리자용 지도
├── api/contact.js    # Vercel Serverless Function
├── frog-professor.png
├── robots.txt
├── sitemap.xml
└── CONTEXT.md        # 이 파일
```

---

## Supabase DB 구조

### schools 테이블
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | TEXT (PK) | a00001 형식 |
| name | TEXT | 학교명 |

**현재 마지막 ID:** a00014
**RLS:** 공개 읽기 허용 (SELECT)

### 현재 등록된 학교 목록 (14개)
- a00001: Stella Maris/SMIS
- a00002: MAZ(SHAH ALAM)
- a00003: Havil
- a00004: Valley
- a00005: Sri Utama / SUIS
- a00006: St. John's
- a00007: Brighton
- a00008: MAZ(PETALING JAYA)
- a00009: Inspiros
- a00010: Regent
- a00011: Zenith
- a00012: Heritage
- a00013: Alnoor / AIS
- a00014: Global Modern / GMIS

---

## Supabase DB 구조 — 손해사정사 데이터

> 원본 데이터: C:\Users\user\Downloads\20260316-0013\sql\

### 테이블 구조 (5개)

| 테이블 | 설명 | 건수 |
|--------|------|------|
| fss_raw | FSS 등록손해사정사 원본 | 14,245건 |
| kicaa_registrations_raw | KICAA 등록 원본 | 4,090건 |
| kicaa_persons_raw | KICAA 인물 원본 | 3,706건 |
| verified_adjusters | FSS+KICAA 완전 일치 (웹 게시용) | **3,952건** |
| pending_review | 불일치 항목 (검토 대기) | **135건** |

### pending_review 오류 유형

| issue_type | 설명 |
|------------|------|
| FSS없음 | FSS에 등록번호 없음 |
| 이름불일치 | 이름이 다름 (류↔유 변형 허용 후에도) |
| 날짜불일치 | 최초등록일이 다름 |
| 복합오류 | 이름+날짜 모두 불일치 |

### SQL 파일 위치
- `01_create_tables.sql` — 5개 테이블 생성 + RLS 공개읽기
- `02_classify.sql` — verified/pending 자동 분류 로직

---

## 현재 상태 (2026-03-20 기준)

- [x] 랜딩페이지 배포 완료 (minsl.com)
- [x] Vercel 자동 배포 연결
- [x] Google Analytics / Clarity / Vercel Analytics 연결
- [x] SEO 기본 설정 (meta, OG, robots.txt, sitemap.xml)
- [x] 문의 폼 → Google Sheets 저장 구조
- [x] 출판 목록 섹션 (Apps Script → 사이트 자동 반영)
- [x] list.html: 노무사·세무사 목록 (Google Sheets)
- [x] list2.html: 학교 목록 (Supabase)
- [x] Supabase schools 테이블 생성 및 데이터 입력
- [x] Supabase 손해사정사 DB 구축 (5개 테이블, 분류 완료)
- [x] verified_adjusters 3,952건 / pending_review 135건 분류 완료
- [ ] minsl.com www 서브도메인 DNS 최종 확인
- [ ] Search Console 소유권 확인 및 sitemap 제출 완료 여부 재확인
- [ ] 문의 발생 시 이메일 알림 기능 추가
- [ ] verified_adjusters 데이터를 웹 페이지에 표시하는 기능 구현

---

## 다음 할 일

1. 학교 목록 계속 수집 → Claude에게 텍스트로 주면 SQL로 만들어줌
2. Search Console 등록 완료
3. 문의 이메일 알림 기능 (Apps Script 수정)
4. 필요시 schools 테이블에 컬럼 추가 (예: 지역, 유형, 연락처 등)
5. verified_adjusters 웹 조회 페이지 구현 (검색, 필터 기능)
6. pending_review 135건 수동 검토 후 resolved 처리

---

## 작업 방식 메모

- **학교 데이터 추가:** Claude에게 학교 이름 목록을 주면 SQL INSERT 문 생성해줌
  → Supabase SQL Editor에 붙여넣고 Run
- **사이트 수정 후 배포:** VS Code 터미널에서 `git add . → git commit -m "내용" → git push`
- **로컬 미리보기:** VS Code 하단 `Go Live` 버튼 또는 Port:5500 클릭
- **pending_review 검토:** Supabase Table Editor에서 correct_name, correct_date 입력 후 status를 'resolved'로 변경

---

## 변경 이력

| 날짜 | 내용 |
|------|------|
| 2026-03-20 | 초기 셋업 완료, list2.html Supabase 연동, 다른목록 버튼 추가 |
| 2026-03-20 | 손해사정사 DB 구축 (fss_raw 14,245건, kicaa 4,090건 임포트, 자동 분류 완료) |
