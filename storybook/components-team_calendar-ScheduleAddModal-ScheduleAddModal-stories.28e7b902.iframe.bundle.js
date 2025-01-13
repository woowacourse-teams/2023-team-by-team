"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1036],{"./src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _hooks_useModal__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/hooks/useModal.ts"),_components_team_calendar_ScheduleAddModal_ScheduleAddModal__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.tsx"),_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/common/Button/Button.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Schedule/ScheduleAddModal",component:_components_team_calendar_ScheduleAddModal_ScheduleAddModal__WEBPACK_IMPORTED_MODULE_1__.A,tags:["autodocs"],parameters:{docs:{description:{component:"`ScheduleAddModal` 컴포넌트는 일정 등록을 위한 폼을 포함하고 있는 모달 컴포넌트입니다."}}}},SampleModal=()=>{const{openModal}=(0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_0__.h)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__.A,{onClick:openModal,children:"모달 열기"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_team_calendar_ScheduleAddModal_ScheduleAddModal__WEBPACK_IMPORTED_MODULE_1__.A,{clickedDate:new Date})]})},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(SampleModal,{}),args:{clickedDate:new Date}},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <SampleModal />,\n  args: {\n    clickedDate: new Date()\n  }\n}",...Default.parameters?.docs?.source}}}},"./src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ScheduleAddModal_ScheduleAddModal});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const Backdrop=styled_components_browser_esm.I4.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.I4.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  ${({$calendarSize,$isMobile})=>"md"===$calendarSize||$isMobile?styled_components_browser_esm.AH`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `:"sm"===$calendarSize?styled_components_browser_esm.AH`
        top: 20%;
        left: 13.5%;
      `:void 0}

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.AH`
        width: 300px;
        padding: 10px 26px 20px;
      `:styled_components_browser_esm.AH`
      width: 380px;
      min-height: 300px;
      padding: 16px 20px;
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

    row-gap: 10px;
  }
`,Header=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 30px;
  margin-bottom: 18px;

  border-bottom: ${({theme})=>`1px solid ${theme.color.GRAY300}`};
`,TitleWrapper=styled_components_browser_esm.I4.div`
  width: 100%;
  height: 38px;
`,InnerContainer=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`,ConvenientContainer=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  column-gap: 8px;
`,TimeSelectContainer=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: ${({$isMobile})=>$isMobile?"74px":"40px"};

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.AH`
        flex-direction: column;
        gap: 4px;
      `:styled_components_browser_esm.AH`
      align-items: center;
    `}
`,InputWrapper=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: ${({$isMobile})=>!$isMobile&&"calc(100% - 70px)"};
`,TeamNameContainer=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;

  height: 23px;

  gap: 5px;
`,ControlButtonWrapper=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 38px;
`,DescriptionTextarea=styled_components_browser_esm.I4.textarea`
  display: inline-block;
  width: 100%;
  padding: 6px 10px;

  border: none;
  border-bottom: 1px solid ${theme.A.color.GRAY200};
  border-radius: 10px;

  font-size: 14px;
  resize: none;
  white-space: normal;
  overflow-wrap: break-word;
`,WarnDiv=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: flex-end;
`,title=styled_components_browser_esm.AH`
  padding: 10px 20px;

  border: none;
  border-radius: 10px;
  background-color: ${({theme})=>theme.color.GRAY200};

  font-size: 16px;
`,closeButton=styled_components_browser_esm.AH`
  width: 24px;
  height: 24px;
  padding: 0;
  margin-bottom: 4px;

  svg {
    width: 24px;
    height: 24px;
  }
`,dateTimeLocalInput=(styled_components_browser_esm.AH`
  width: 150px;
  height: 40px;

  border: 1px solid ${({theme})=>theme.color.GRAY200};
  border-radius: 4px;
`,styled_components_browser_esm.AH`
  border-radius: 4px;

  text-align: center;
`),teamPlaceName=styled_components_browser_esm.AH`
  overflow: hidden;

  max-width: 250px;

  text-overflow: ellipsis;
  white-space: nowrap;
`,submitButton=styled_components_browser_esm.AH`
  width: 76px;
  padding: 0;
`,descriptionText=$isDescription=>styled_components_browser_esm.AH`
  color: ${$isDescription?theme.A.color.WHITE:theme.A.color.PRIMARY};
`,errorText=styled_components_browser_esm.AH`
  color: ${theme.A.color.RED};
`;var useModal=__webpack_require__("./src/hooks/useModal.ts"),svg=__webpack_require__("./src/assets/svg/index.ts"),Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),schedule=__webpack_require__("./src/apis/schedule.ts");const useSendSchedule=teamPlaceId=>{const queryClient=(0,QueryClientProvider.jE)(),{mutate}=(0,useMutation.n)((body=>(0,schedule.iR)(teamPlaceId,body)),{onSuccess:()=>{queryClient.invalidateQueries(["schedules",teamPlaceId]),queryClient.invalidateQueries(["mySchedules"]),queryClient.invalidateQueries(["myDailySchedules"])}});return{mutateSendSchedule:mutate}};var typeGuard=__webpack_require__("./src/types/typeGuard.ts"),react=__webpack_require__("./node_modules/react/index.js"),useToast=__webpack_require__("./src/hooks/useToast.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),useDateTimeRange=__webpack_require__("./src/hooks/schedule/useDateTimeRange.ts"),calendar=__webpack_require__("./src/constants/calendar.ts");var TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),TimeTableMenu=__webpack_require__("./src/components/team_calendar/TimeTableMenu/TimeTableMenu.tsx"),getIsMobile=__webpack_require__("./src/utils/getIsMobile.ts"),Switch=__webpack_require__("./src/components/common/Switch/Switch.tsx"),Svg=__webpack_require__("./src/components/common/Svg/Svg.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleAddModal=props=>{const{clickedDate,calendarSize="md"}=props,{closeModal}=(0,useModal.h)(),{teamPlaceColor,displayName}=(0,useTeamPlace.Y)(),isMobile=(0,getIsMobile.N)(),{schedule,isAllDay,times,isDescription,isDescriptionMaxLength,handlers:{handleScheduleChange,handleScheduleBlur,handleIsAllDayChange,handleStartTimeChange,handleEndTimeChange,handleScheduleSubmit,handleIsDescription,handleDescriptionInput}}=(clickedDate=>{const{title,description,startDate,endDate,startTime,endTime,isValid,isAllDay,handleScheduleChange,handleScheduleBlur,handleStartTimeChange,handleEndTimeChange,handleIsAllDayChange,handleDescriptionChange}=(0,useDateTimeRange.a)(clickedDate,"",""),[isDescription,setIsDescription]=(0,react.useState)(!1),[isDescriptionMaxLength,setIsDescriptionMaxLength]=(0,react.useState)(!1),{closeModal}=(0,useModal.h)(),{showToast}=(0,useToast.d)(),{teamPlaceId}=(0,useTeamPlace.Y)(),{mutateSendSchedule}=useSendSchedule(teamPlaceId);return{schedule:{title,description,startDate,endDate},isAllDay,times:{startTime,endTime},isDescription,isDescriptionMaxLength,handlers:{handleScheduleChange,handleScheduleBlur,handleIsAllDayChange,handleStartTimeChange,handleEndTimeChange,handleScheduleSubmit:e=>{e.preventDefault();const startDateTime=`${startDate} ${startTime}`,endDateTime=`${endDate} ${endTime}`;(0,typeGuard.v)(startDateTime)&&(0,typeGuard.v)(endDateTime)&&(isValid?mutateSendSchedule({title,startDateTime,endDateTime,description},{onSuccess:()=>{showToast("success","일정이 등록되었습니다."),closeModal()},onError:error=>{500===error.status&&showToast("error","일정 제목이 최대 글자(250자)를 초과했습니다.")}}):showToast("error","날짜/시간 형식이 올바르지 않습니다. 올바르게 입력 후 다시 시도해 주세요."))},handleIsDescription:()=>{setIsDescription((prev=>(prev&&(handleDescriptionChange(""),setIsDescriptionMaxLength(!1)),!prev)))},handleDescriptionInput:e=>{const textarea=e.target;textarea.style.height="auto",textarea.style.height=`${textarea.scrollHeight}px`,textarea.value.length>calendar.Dd?setIsDescriptionMaxLength(!0):setIsDescriptionMaxLength(!1),handleDescriptionChange(textarea.value.slice(0,calendar.Dd))}}}})(clickedDate),titleInputRef=(0,react.useRef)(null),descriptionInputRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{titleInputRef.current?.focus()}),[]),(0,react.useEffect)((()=>{isDescription&&descriptionInputRef.current?.focus()}),[isDescription]),(0,jsx_runtime.jsxs)(Modal.A,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{$calendarSize:calendarSize,$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Header,{children:(0,jsx_runtime.jsx)(Button.A,{variant:"plain",type:"button",onClick:closeModal,css:closeButton,"aria-label":"일정 등록 모달 닫기",children:(0,jsx_runtime.jsx)(svg.CloseIcon,{})})}),(0,jsx_runtime.jsxs)("form",{onSubmit:handleScheduleSubmit,children:[(0,jsx_runtime.jsx)(TitleWrapper,{children:(0,jsx_runtime.jsx)(Input.A,{width:"100%",height:"100%",placeholder:"일정 제목을 입력해 주세요.",css:title,name:"title",maxLength:250,value:schedule.title,ref:titleInputRef,required:!0,onChange:handleScheduleChange})}),(0,jsx_runtime.jsxs)(TimeSelectContainer,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Text.A,{weight:"semiBold",children:"일정 시작"}),(0,jsx_runtime.jsxs)(InputWrapper,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Input.A,{width:isAllDay?"100%":"50%",height:"36px",type:"date",css:dateTimeLocalInput,name:"startDate",value:schedule.startDate,onChange:handleScheduleChange,onBlur:handleScheduleBlur,"aria-label":`일정 시작 일자는 ${schedule.startDate} 입니다`,required:!0}),!isAllDay&&(0,jsx_runtime.jsx)(TimeTableMenu.A,{displayValue:times.startTime,onSelect:handleStartTimeChange})]})]}),(0,jsx_runtime.jsxs)(TimeSelectContainer,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Text.A,{size:"md",weight:"semiBold",children:"일정 마감"}),(0,jsx_runtime.jsxs)(InputWrapper,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Input.A,{width:isAllDay?"100%":"50%",height:"36px",type:"date",css:dateTimeLocalInput,name:"endDate",value:schedule.endDate,"aria-label":`일정 마감 일자는 ${schedule.endDate} 입니다`,onChange:handleScheduleChange,onBlur:handleScheduleBlur,required:!0}),!isAllDay&&(0,jsx_runtime.jsx)(TimeTableMenu.A,{displayValue:times.endTime,onSelect:handleEndTimeChange})]})]}),(0,jsx_runtime.jsxs)(ConvenientContainer,{children:[(0,jsx_runtime.jsx)(Switch.A,{checked:isAllDay,onChange:handleIsAllDayChange,onLabel:"종일",offLabel:"종일",onColor:theme.A.color.PRIMARY}),(0,jsx_runtime.jsx)("p",{className:"hidden","aria-live":"assertive","aria-relevant":"additions",children:isAllDay?"종일 일정이 선택되었습니다.":"종일 일정이 해제되었습니다."}),(0,jsx_runtime.jsxs)(Button.A,{variant:"plain",type:"button",css:($isDescription=isDescription,styled_components_browser_esm.AH`
  display: flex;
  padding: 2px 6px;
  align-items: center;
  border: 1px solid ${theme.A.color.PRIMARY};
  border-radius: 25px;
  background-color: ${$isDescription?theme.A.color.PRIMARY:theme.A.color.WHITE};
`),onClick:handleIsDescription,children:[(0,jsx_runtime.jsx)(Svg.A,{type:"MemoIcon",size:18,fill:isDescription?theme.A.color.WHITE:theme.A.color.PRIMARY}),(0,jsx_runtime.jsx)(Text.A,{css:descriptionText(isDescription),weight:"semiBold",size:"sm",children:"메모"})]})]}),isDescription&&(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(DescriptionTextarea,{rows:1,placeholder:`메모를 작성해주세요.(최대 ${calendar.Dd}자)`,value:schedule.description,ref:descriptionInputRef,onChange:handleDescriptionInput}),(0,jsx_runtime.jsx)(WarnDiv,{children:isDescriptionMaxLength?(0,jsx_runtime.jsxs)(Text.A,{size:"xs",css:errorText,children:["최대 $",calendar.Dd,"자까지 입력가능합니다."]}):(0,jsx_runtime.jsxs)(Text.A,{size:"xs",children:["(",schedule.description.length," /",calendar.Dd,"자)"]})})]}),(0,jsx_runtime.jsxs)(InnerContainer,{children:[(0,jsx_runtime.jsxs)(TeamNameContainer,{title:displayName,children:[(0,jsx_runtime.jsx)(TeamBadge.A,{teamPlaceColor,size:"md"}),!isMobile&&(0,jsx_runtime.jsx)(Text.A,{css:teamPlaceName,size:"sm",children:displayName})]}),(0,jsx_runtime.jsx)(ControlButtonWrapper,{children:(0,jsx_runtime.jsx)(Button.A,{variant:"primary",css:submitButton,children:"등록"})})]})]})]})]});var $isDescription},ScheduleAddModal_ScheduleAddModal=ScheduleAddModal;try{ScheduleAddModal.displayName="ScheduleAddModal",ScheduleAddModal.__docgenInfo={description:"",displayName:"ScheduleAddModal",props:{calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},clickedDate:{defaultValue:null,description:"",name:"clickedDate",required:!0,type:{name:"Date"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.tsx#ScheduleAddModal"]={docgenInfo:ScheduleAddModal.__docgenInfo,name:"ScheduleAddModal",path:"src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.tsx#ScheduleAddModal"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-team_calendar-ScheduleAddModal-ScheduleAddModal-stories.28e7b902.iframe.bundle.js.map