"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1316],{"./src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _hooks_useModal__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/hooks/useModal.ts"),_components_team_calendar_ScheduleAddModal_ScheduleAddModal__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.tsx"),_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/common/Button/Button.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Schedule/ScheduleAddModal",component:_components_team_calendar_ScheduleAddModal_ScheduleAddModal__WEBPACK_IMPORTED_MODULE_1__.Z,tags:["autodocs"],parameters:{docs:{description:{component:"`ScheduleAddModal` 컴포넌트는 일정 등록을 위한 폼을 포함하고 있는 모달 컴포넌트입니다."}}}},SampleModal=()=>{const{openModal}=(0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_0__.d)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__.Z,{onClick:openModal,children:"모달 열기"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_team_calendar_ScheduleAddModal_ScheduleAddModal__WEBPACK_IMPORTED_MODULE_1__.Z,{clickedDate:new Date})]})},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(SampleModal,{}),args:{clickedDate:new Date}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <SampleModal />,\n  args: {\n    clickedDate: new Date()\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ScheduleAddModal_ScheduleAddModal});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  ${({$calendarSize,$isMobile})=>"md"===$calendarSize||$isMobile?styled_components_browser_esm.iv`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `:"sm"===$calendarSize?styled_components_browser_esm.iv`
        top: 20%;
        left: 13.5%;
      `:void 0}

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.iv`
        width: 300px;
        padding: 10px 26px 20px;
      `:styled_components_browser_esm.iv`
      width: 400px;
      min-height: 320px;
      padding: 18px 22px;
    `}
  
  border-radius: 10px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({theme})=>theme.color.WHITE};

  & > form {
    display: flex;
    flex-direction: column;

    row-gap: ${({$isMobile})=>$isMobile?"10px":"16px"};
  }
`,Header=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 34px;
  margin-bottom: 18px;

  border-bottom: ${({theme})=>`1px solid ${theme.color.GRAY300}`};
`,TitleWrapper=styled_components_browser_esm.zo.div`
  width: 100%;
  height: 38px;
`,InnerContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`,CheckboxContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  column-gap: 8px;
`,TimeSelectContainer=styled_components_browser_esm.zo.div`
  display: flex;

  width: 100%;
  height: ${({$isMobile})=>$isMobile?"74px":"40px"};

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.iv`
        flex-direction: column;
        gap: 4px;
      `:styled_components_browser_esm.iv`
      align-items: center;
    `}
`,InputWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: ${({$isMobile})=>!$isMobile&&"calc(100% - 80px)"};

  margin-left: ${({$isMobile})=>!$isMobile&&"auto"};
`,TeamNameContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;

  height: 23px;

  gap: 5px;
`,ControlButtonWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 38px;
`,title=styled_components_browser_esm.iv`
  padding: 10px 20px;

  border: none;
  border-radius: 10px;
  background-color: ${({theme})=>theme.color.GRAY200};

  font-size: 18px;
`,closeButton=styled_components_browser_esm.iv`
  width: 28px;
  height: 28px;
  padding: 0;
  margin-bottom: 4px;

  svg {
    width: 28px;
    height: 28px;
  }
`,dateTimeLocalInput=(styled_components_browser_esm.iv`
  width: 150px;
  height: 40px;

  border: 1px solid ${({theme})=>theme.color.GRAY200};
  border-radius: 4px;
`,styled_components_browser_esm.iv`
  border-radius: 4px;

  text-align: center;
`),teamPlaceName=styled_components_browser_esm.iv`
  overflow: hidden;

  max-width: 250px;

  text-overflow: ellipsis;
  white-space: nowrap;
`,submitButton=styled_components_browser_esm.iv`
  width: 80px;
  padding: 0;
`;var useModal=__webpack_require__("./src/hooks/useModal.ts"),svg=__webpack_require__("./src/assets/svg/index.ts"),Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),schedule=__webpack_require__("./src/apis/schedule.ts");const useSendSchedule=teamPlaceId=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate}=(0,useMutation.D)((body=>(0,schedule.wV)(teamPlaceId,body)),{onSuccess:()=>{queryClient.invalidateQueries(["schedules",teamPlaceId]),queryClient.invalidateQueries(["mySchedules"]),queryClient.invalidateQueries(["myDailySchedules"])}});return{mutateSendSchedule:mutate}};var typeGuard=__webpack_require__("./src/types/typeGuard.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),useDateTimeRange=__webpack_require__("./src/hooks/schedule/useDateTimeRange.ts");var Checkbox=__webpack_require__("./src/components/common/Checkbox/Checkbox.tsx"),TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),TimeTableMenu=__webpack_require__("./src/components/team_calendar/TimeTableMenu/TimeTableMenu.tsx"),react=__webpack_require__("./node_modules/react/index.js"),getIsMobile=__webpack_require__("./src/utils/getIsMobile.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleAddModal=props=>{const{clickedDate,calendarSize="md"}=props,{closeModal}=(0,useModal.d)(),{teamPlaceColor,displayName}=(0,useTeamPlace.l)(),isMobile=(0,getIsMobile.W)(),{schedule,isAllDay,times,handlers:{handleScheduleChange,handleScheduleBlur,handleIsAllDayChange,handleStartTimeChange,handleEndTimeChange,handleScheduleSubmit}}=(clickedDate=>{const{title,startDate,endDate,startTime,endTime,isValid,isAllDay,handleScheduleChange,handleScheduleBlur,handleStartTimeChange,handleEndTimeChange,handleIsAllDayChange}=(0,useDateTimeRange.u)(clickedDate,""),{closeModal}=(0,useModal.d)(),{showToast}=(0,useToast.p)(),{teamPlaceId}=(0,useTeamPlace.l)(),{mutateSendSchedule}=useSendSchedule(teamPlaceId);return{schedule:{title,startDate,endDate},isAllDay,times:{startTime,endTime},handlers:{handleScheduleChange,handleScheduleBlur,handleIsAllDayChange,handleStartTimeChange,handleEndTimeChange,handleScheduleSubmit:e=>{e.preventDefault();const startDateTime=`${startDate} ${startTime}`,endDateTime=`${endDate} ${endTime}`;(0,typeGuard.r)(startDateTime)&&(0,typeGuard.r)(endDateTime)&&(isValid?mutateSendSchedule({title,startDateTime,endDateTime},{onSuccess:()=>{showToast("success","일정이 등록되었습니다."),closeModal()},onError:error=>{500===error.status&&showToast("error","일정 제목이 최대 글자(250자)를 초과했습니다.")}}):showToast("error","날짜/시간 형식이 올바르지 않습니다. 올바르게 입력 후 다시 시도해 주세요."))}}}})(clickedDate),titleInputRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{titleInputRef.current?.focus()}),[]),(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{$calendarSize:calendarSize,$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Header,{children:(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",onClick:closeModal,css:closeButton,"aria-label":"일정 등록 모달 닫기",children:(0,jsx_runtime.jsx)(svg.Tw,{})})}),(0,jsx_runtime.jsxs)("form",{onSubmit:handleScheduleSubmit,children:[(0,jsx_runtime.jsx)(TitleWrapper,{children:(0,jsx_runtime.jsx)(Input.Z,{width:"100%",height:"100%",placeholder:"일정 제목을 입력해 주세요.",css:title,name:"title",maxLength:250,value:schedule.title,ref:titleInputRef,required:!0,onChange:handleScheduleChange})}),(0,jsx_runtime.jsxs)(TimeSelectContainer,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Text.Z,{size:"lg",weight:"semiBold",children:"일정 시작"}),(0,jsx_runtime.jsxs)(InputWrapper,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Input.Z,{width:isAllDay?"100%":"50%",height:"40px",type:"date",css:dateTimeLocalInput,name:"startDate",value:schedule.startDate,onChange:handleScheduleChange,onBlur:handleScheduleBlur,"aria-label":`일정 시작 일자는 ${schedule.startDate} 입니다`,required:!0}),!isAllDay&&(0,jsx_runtime.jsx)(TimeTableMenu.Z,{displayValue:times.startTime,onSelect:handleStartTimeChange})]})]}),(0,jsx_runtime.jsxs)(TimeSelectContainer,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Text.Z,{size:"lg",weight:"semiBold",children:"일정 마감"}),(0,jsx_runtime.jsxs)(InputWrapper,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Input.Z,{width:isAllDay?"100%":"50%",height:"40px",type:"date",css:dateTimeLocalInput,name:"endDate",value:schedule.endDate,"aria-label":`일정 마감 일자는 ${schedule.endDate} 입니다`,onChange:handleScheduleChange,onBlur:handleScheduleBlur,required:!0}),!isAllDay&&(0,jsx_runtime.jsx)(TimeTableMenu.Z,{displayValue:times.endTime,onSelect:handleEndTimeChange})]})]}),(0,jsx_runtime.jsxs)(CheckboxContainer,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"md",weight:"semiBold",children:"종일"}),(0,jsx_runtime.jsx)(Checkbox.Z,{size:"sm",isChecked:isAllDay,onChange:handleIsAllDayChange}),(0,jsx_runtime.jsx)("p",{className:"hidden","aria-live":"assertive","aria-relevant":"additions",children:isAllDay?"종일 일정이 선택되었습니다.":"종일 일정이 해제되었습니다."})]}),(0,jsx_runtime.jsxs)(InnerContainer,{children:[(0,jsx_runtime.jsxs)(TeamNameContainer,{title:displayName,children:[(0,jsx_runtime.jsx)(TeamBadge.Z,{teamPlaceColor,size:"lg"}),!isMobile&&(0,jsx_runtime.jsx)(Text.Z,{css:teamPlaceName,children:displayName})]}),(0,jsx_runtime.jsx)(ControlButtonWrapper,{children:(0,jsx_runtime.jsx)(Button.Z,{variant:"primary",css:submitButton,children:"등록"})})]})]})]})]})};ScheduleAddModal.displayName="ScheduleAddModal";const ScheduleAddModal_ScheduleAddModal=ScheduleAddModal;try{ScheduleAddModal.displayName="ScheduleAddModal",ScheduleAddModal.__docgenInfo={description:"",displayName:"ScheduleAddModal",props:{calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},clickedDate:{defaultValue:null,description:"",name:"clickedDate",required:!0,type:{name:"Date"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.tsx#ScheduleAddModal"]={docgenInfo:ScheduleAddModal.__docgenInfo,name:"ScheduleAddModal",path:"src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.tsx#ScheduleAddModal"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-team_calendar-ScheduleAddModal-ScheduleAddModal-stories.3dc46ca3.iframe.bundle.js.map