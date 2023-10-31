"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1383],{"./src/components/team_calendar/ICalendarModal/ICalendarModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _hooks_useModal__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/hooks/useModal.ts"),_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Button/Button.tsx"),_components_team_calendar_ICalendarModal_ICalendarModal__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/team_calendar/ICalendarModal/ICalendarModal.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Schedule/ICalendarModal",component:_components_team_calendar_ICalendarModal_ICalendarModal__WEBPACK_IMPORTED_MODULE_2__.Z,tags:["autodocs"]},SampleModal=()=>{const{openModal}=(0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_0__.d)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_1__.Z,{onClick:openModal,children:"모달 열기"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_team_calendar_ICalendarModal_ICalendarModal__WEBPACK_IMPORTED_MODULE_2__.Z,{})]})},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(SampleModal,{}),args:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <SampleModal />,\n  args: {}\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/apis/schedule.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Rd:()=>fetchSchedules,Tg:()=>modifySchedule,Yx:()=>fetchICalendarUrl,e4:()=>fetchScheduleById,ie:()=>fetchMySchedules,wV:()=>sendSchedule,wn:()=>deleteSchedule});var _apis_http__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/http.ts");const fetchSchedules=(teamPlaceId,year,month,day)=>{const query=day?`year=${year}&month=${month}&day=${day}`:`year=${year}&month=${month}`;return _apis_http__WEBPACK_IMPORTED_MODULE_0__.d.get(`/api/team-place/${teamPlaceId}/calendar/schedules?${query}`)},fetchMySchedules=(year,month,day)=>{const query=day?`year=${year}&month=${month}&day=${day}`:`year=${year}&month=${month}`;return _apis_http__WEBPACK_IMPORTED_MODULE_0__.d.get(`/api/my-calendar/schedules?${query}`)},fetchScheduleById=(teamPlaceId,scheduleId)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.get(`/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`),fetchICalendarUrl=teamPlaceId=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.get(`/api/team-place/${teamPlaceId}/icalendar-url`),deleteSchedule=(teamPlaceId,scheduleId)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.delete(`/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`),sendSchedule=(teamPlaceId,body)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.post(`/api/team-place/${teamPlaceId}/calendar/schedules`,body),modifySchedule=(teamPlaceId,scheduleId,body)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.patch(`/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`,body)},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.PRIMARY};
    color: ${({theme})=>theme.color.WHITE};
  `,normal:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.WHITE};
    color: ${({theme})=>theme.color.GRAY900};
    border: 1px solid ${({theme})=>theme.color.GRAY300};
  `,plain:styled_components_browser_esm.iv`
    background-color: transparent;
    color: ${({theme})=>theme.color.GRAY900};
  `},ButtonWrapper=styled_components_browser_esm.zo.button.withConfig({shouldForwardProp:prop=>!["css","variant","size"].includes(prop)})`
  font-size: 16px;
  line-height: 16px;
  text-align: center;

  ${({size="md"})=>styled_components_browser_esm.iv`
      padding: ${paddingSize[size]};
    `};

  ${({variant="primary"})=>variants[variant]};

  ${({variant="primary"})=>{if("plain"!==variant)return styled_components_browser_esm.iv`
        &:disabled {
          opacity: 0.6;
        }

        &:not([disabled]):hover {
          opacity: 0.8;
        }

        border-radius: 4px;

        transition: 0.2s;
      `}};

  ${props=>props.css}
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Modal/Modal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal_Modal});var react_dom=__webpack_require__("./node_modules/react-dom/index.js"),useModal=__webpack_require__("./src/hooks/useModal.ts"),react=__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Modal=props=>{const{children}=props,{isModalOpen,closeModal}=(0,useModal.d)();var triggerKey,callback;return triggerKey="Escape",callback=closeModal,(0,react.useEffect)((()=>{const handleKeydown=e=>{e.key===triggerKey&&callback()};return document.addEventListener("keydown",handleKeydown),()=>{document.removeEventListener("keydown",handleKeydown)}}),[callback,triggerKey]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:isModalOpen&&(0,react_dom.createPortal)((0,jsx_runtime.jsx)("div",{role:"dialog","aria-modal":!0,children}),document.body)})},Modal_Modal=Modal;try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/Modal.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/Modal.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
  h1&,
  h2&,
  h3&,
  h4&,
  h5&,
  h6& {
    font-weight: bold;
  }
  h1& {
    font-size: 36px;
  }
  h2& {
    font-size: 32px;
  }
  h3& {
    font-size: 28px;
  }
  h4& {
    font-size: 24px;
  }
  p&,
  span&,
  strong&,
  small& {
    font-size: ${({size="md"})=>fontSize[size]||"initial"};
    font-weight: ${({weight="normal"})=>fontWeight[weight]||"initial"};
  }
  && {
    ${props=>props.css}
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/ICalendarModal/ICalendarModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ICalendarModal_ICalendarModal});var react=__webpack_require__("./node_modules/react/index.js"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SpacingRoot=styled_components_browser_esm.ZP.div.withConfig({shouldForwardProp:prop=>!["size","direction"].includes(prop)})`
  ${({direction,size})=>"vertical"===direction?styled_components_browser_esm.iv`
        width: 1px;
        height: ${size}px;
      `:"horizontal"===direction?styled_components_browser_esm.iv`
        width: ${size}px;
        height: 1px;
      `:void 0}
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Spacing=props=>{const{size=1,direction="vertical"}=props;return(0,jsx_runtime.jsx)(SpacingRoot,{size,direction})};Spacing.displayName="Spacing";const Spacing_Spacing=Spacing;try{Spacing.displayName="Spacing",Spacing.__docgenInfo={description:"",displayName:"Spacing",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"number"}},direction:{defaultValue:null,description:"",name:"direction",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Spacing/Spacing.tsx#Spacing"]={docgenInfo:Spacing.__docgenInfo,name:"Spacing",path:"src/components/common/Spacing/Spacing.tsx#Spacing"})}catch(__react_docgen_typescript_loader_error){}var useModal=__webpack_require__("./src/hooks/useModal.ts"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),schedule=__webpack_require__("./src/apis/schedule.ts"),query=__webpack_require__("./src/constants/query.ts");var useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),svg=__webpack_require__("./src/assets/svg/index.ts");const Backdrop=styled_components_browser_esm.ZP.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.ZP.div.withConfig({shouldForwardProp:prop=>!["calendarSize"].includes(prop)})`
  position: fixed;
  display: flex;
  flex-direction: column;
  ${({calendarSize})=>"md"===calendarSize?styled_components_browser_esm.iv`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `:"sm"===calendarSize?styled_components_browser_esm.iv`
        top: 25%;
        left: 14.4%;
      `:void 0}

  width: 400px;
  min-height: 200px;
  padding: 20px;

  border-radius: 8px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({theme})=>theme.color.WHITE};
`,Header=styled_components_browser_esm.ZP.div`
  position: relative;
  display: flex;
  align-items: center;

  & > button {
    margin-left: auto;
  }
`,TooltipWrapper=styled_components_browser_esm.ZP.div`
  display: flex;
  align-items: center;

  cursor: help;
`,Tooltip=styled_components_browser_esm.ZP.div`
  position: absolute;
  top: 30px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 320px;
  height: 100px;
  padding: 10px 20px;

  border: 1px solid ${({theme})=>theme.color.GRAY300};
  border-radius: 8px;
  background-color: ${({theme})=>theme.color.WHITE};

  & > p {
    line-height: 1.3;
  }
`,UrlContainer=styled_components_browser_esm.ZP.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid ${({theme})=>theme.color.GRAY300};
  border-radius: 8px;

  margin: 10px 0 20px 0;
`,UrlWrapper=styled_components_browser_esm.ZP.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 90%;
  height: 40px;
  padding: 0 8px;

  & > div {
    width: 100%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`,UserGuideLink=styled_components_browser_esm.ZP.a`
  align-self: flex-start;
`,closeButton=styled_components_browser_esm.iv`
  padding: 0;
`,copyButton=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 40px;
  padding: 0;

  background-color: ${({theme})=>theme.color.GRAY100};
  border-radius: 0 8px 8px 0;
`,shortcutText=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.GRAY800};
`;var constants_url=__webpack_require__("./src/constants/url.ts");const ICalendarModal=props=>{const{calendarSize="md"}=props,{closeModal}=(0,useModal.d)(),{showToast}=(0,useToast.p)(),{teamPlaceId}=(0,useTeamPlace.l)(),{url}=(teamPlaceId=>{const{data}=(0,useQuery.a)(["iCalendarUrl",teamPlaceId],(()=>(0,schedule.Yx)(teamPlaceId)),{enabled:teamPlaceId>0,staleTime:query.i.ICALENDAR_URL,meta:{errorMessage:"일정 내보내기에 실패했습니다. \n지속되는 경우 관리자에게 문의해주세요."},placeholderData:{url:"https://assets.teamby.team/prod/ical/1"}});return data??{url:""}})(teamPlaceId),[isTooltipOpen,setIsTooltipOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{calendarSize,children:[(0,jsx_runtime.jsxs)(Header,{children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"xl",weight:"semiBold",children:"일정 내보내기"}),(0,jsx_runtime.jsx)(Spacing_Spacing,{size:8,direction:"horizontal"}),(0,jsx_runtime.jsxs)(TooltipWrapper,{tabIndex:0,onFocus:()=>setIsTooltipOpen(!0),onBlur:()=>setIsTooltipOpen(!1),onMouseEnter:()=>setIsTooltipOpen(!0),onMouseLeave:()=>setIsTooltipOpen(!1),children:[(0,jsx_runtime.jsx)(svg.UO,{}),isTooltipOpen&&(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(Tooltip,{role:"tooltip",children:(0,jsx_runtime.jsxs)(Text.Z,{children:["팀바팀 캘린더에 등록된 일정을 ",(0,jsx_runtime.jsx)("br",{}),"구글 캘린더, iOS 캘린더 앱 등에서 사용 가능한"," ",(0,jsx_runtime.jsx)(Text.Z,{as:"span",weight:"semiBold",children:".ics"})," ","파일로 내보내는 기능입니다."]})})})]}),(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",onClick:closeModal,"aria-label":"일정 내보내기 모달 닫기",css:closeButton,children:(0,jsx_runtime.jsx)(svg.Tw,{})})]}),(0,jsx_runtime.jsx)(Spacing_Spacing,{size:16}),(0,jsx_runtime.jsx)(Text.Z,{as:"span",weight:"semiBold",children:"일정 파일(.ics) 경로"}),(0,jsx_runtime.jsxs)(UrlContainer,{children:[(0,jsx_runtime.jsx)(UrlWrapper,{children:(0,jsx_runtime.jsx)("div",{title:url,children:(0,jsx_runtime.jsx)(Text.Z,{as:"span",children:""===url?"경로를 불러오는 데 실패했습니다.":url})})}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",css:copyButton,onClick:()=>{if(""!==url)try{navigator.clipboard.writeText(url),showToast("success","일정 파일(.ics) 경로가 복사되었습니다.")}catch(error){showToast("error","일정 파일(.ics) 경로 복사에 실패했습니다.")}},"aria-label":"일정 내보내기 링크 복사하기",disabled:""===url,children:(0,jsx_runtime.jsx)(svg.Km,{})})]}),(0,jsx_runtime.jsx)(UserGuideLink,{href:constants_url.sE,target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"lg",weight:"semiBold",css:shortcutText,children:"📘 일정 파일(.ics) 사용법"})})]})]})};ICalendarModal.displayName="ICalendarModal";const ICalendarModal_ICalendarModal=ICalendarModal;try{ICalendarModal.displayName="ICalendarModal",ICalendarModal.__docgenInfo={description:"",displayName:"ICalendarModal",props:{calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ICalendarModal/ICalendarModal.tsx#ICalendarModal"]={docgenInfo:ICalendarModal.__docgenInfo,name:"ICalendarModal",path:"src/components/team_calendar/ICalendarModal/ICalendarModal.tsx#ICalendarModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/query.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>STALE_TIME});const STALE_TIME={SCHEDULES:3e4,DAILY_SCHEDULES:3e4,MY_SCHEDULES:3e4,MY_DAILY_SCHEDULES:3e4,USER_INFO:3e5,TEAM_PLACE_MEMBERS:6e4,TEAM_PLACE_INVITE_CODE:1/0,TEAM_LINKS:6e4,ICALENDAR_URL:1/0}},"./src/constants/url.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D_:()=>TEAM_BY_TEAM_REPOSITORY,Mx:()=>TEAM_BY_TEAM_HOW_TO_USE_URL,O8:()=>USER_FEEDBACK_URL,sE:()=>ICALENDAR_USER_GUIDE_URL});const ICALENDAR_USER_GUIDE_URL="https://teambyteam.notion.site/a99a38a030d74be88e761a1dcb1559a1",USER_FEEDBACK_URL="https://forms.gle/Tk8DZ5Xzsc5615Ar7",TEAM_BY_TEAM_HOW_TO_USE_URL="https://teambyteam.notion.site/f84827ca26334913a1c724dfb9436887",TEAM_BY_TEAM_REPOSITORY="https://github.com/woowacourse-teams/2023-team-by-team"},"./src/hooks/useModal.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useModal});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Modal/ModalContext.tsx");const useModal=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__.t);if(void 0===context)throw new Error("useModal must be used within a ModalProvider");return context}},"./src/hooks/useTeamPlace.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>useTeamPlace});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/TeamPlaceContext.tsx");const useTeamPlace=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__.Q);if(void 0===context)throw new Error("useTeamPlace must be used within a TeamPlaceContext");return context}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>useToast});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Toast/ToastContext.tsx");const useToast=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__.u);if(void 0===context)throw new Error("useToast must be used within a ToastProvider");return context}}}]);
//# sourceMappingURL=components-team_calendar-ICalendarModal-ICalendarModal-stories.3c3c4955.iframe.bundle.js.map