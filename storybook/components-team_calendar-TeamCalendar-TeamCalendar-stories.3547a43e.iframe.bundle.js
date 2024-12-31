"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3144],{"./src/components/common/DateCell/DateCell.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>DateCell_DateCell});var parseDate=__webpack_require__("./src/utils/parseDate.ts"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.I4.div.withConfig({shouldForwardProp:prop=>!["isSunday","isSaturday","size"].includes(prop)})`
  display: flex;
  flex-direction: column;

  ${({size})=>"sm"===size?styled_components_browser_esm.AH`
        align-items: center;
        padding-top: 4px;
      `:"md"===size||"lg"===size?styled_components_browser_esm.AH`
        align-items: flex-end;
        padding: 2px 2px 0 0;

        text-align: right;
      `:void 0};

  color: ${({isSaturday,isSunday,theme})=>isSunday?theme.color.RED:isSaturday?theme.color.PURPLE:theme.color.BLACK};

  cursor: pointer;
`,DateBadge=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;
  height: 24px;

  border-radius: 50%;

  &:hover {
    background-color: ${({theme})=>theme.color.GRAY300};
  }
  background-color: ${({$isToday,theme,$isCurrentMonth})=>$isToday&&$isCurrentMonth?theme.color.BLACK:$isToday?theme.color.GRAY400:void 0};
`,dateText=(isCurrentMonth,isToday,isSaturday,isSunday,size)=>styled_components_browser_esm.AH`
  color: ${({theme})=>isToday?theme.color.WHITE:isSunday?theme.color.RED:isSaturday?theme.color.PURPLE:theme.color.BLACK};
  font-size: ${"sm"===size?14:12}px;

  opacity: ${isCurrentMonth?1:.3};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const DateCell=props=>{const{rawDate,currentMonth,size="lg",isToday=!1,onClick,onDayClick}=props,{date,day}=(0,parseDate._)(rawDate),isSunday=0===day,isSaturday=6===day,isCurrentMonth=rawDate.getMonth()===currentMonth;return(0,jsx_runtime.jsx)(Wrapper,{isSunday,isSaturday,size,onClick,children:(0,jsx_runtime.jsx)(DateBadge,{$isCurrentMonth:isCurrentMonth,onClick:onDayClick,$isToday:isToday,children:(0,jsx_runtime.jsx)(Text.A,{css:dateText(isCurrentMonth,isToday,isSaturday,isSunday,size),children:date})})})};DateCell.displayName="DateCell";const DateCell_DateCell=DateCell;try{DateCell.displayName="DateCell",DateCell.__docgenInfo={description:"",displayName:"DateCell",props:{rawDate:{defaultValue:null,description:"",name:"rawDate",required:!0,type:{name:"Date"}},currentMonth:{defaultValue:null,description:"",name:"currentMonth",required:!0,type:{name:"number"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},isToday:{defaultValue:null,description:"",name:"isToday",required:!1,type:{name:"boolean"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},onDayClick:{defaultValue:null,description:"",name:"onDayClick",required:!1,type:{name:"MouseEventHandler<HTMLDivElement>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/DateCell/DateCell.tsx#DateCell"]={docgenInfo:DateCell.__docgenInfo,name:"DateCell",path:"src/components/common/DateCell/DateCell.tsx#DateCell"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Spacing/Spacing.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Spacing_Spacing});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const SpacingRoot=styled_components_browser_esm.Ay.div.withConfig({shouldForwardProp:prop=>!["size","direction"].includes(prop)})`
  ${({direction,size})=>"vertical"===direction?styled_components_browser_esm.AH`
        width: 1px;
        height: ${size}px;
      `:"horizontal"===direction?styled_components_browser_esm.AH`
        width: ${size}px;
        height: 1px;
      `:void 0}
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Spacing=props=>{const{size=1,direction="vertical"}=props;return(0,jsx_runtime.jsx)(SpacingRoot,{size,direction})};Spacing.displayName="Spacing";const Spacing_Spacing=Spacing;try{Spacing.displayName="Spacing",Spacing.__docgenInfo={description:"",displayName:"Spacing",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"number"}},direction:{defaultValue:null,description:"",name:"direction",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Spacing/Spacing.tsx#Spacing"]={docgenInfo:Spacing.__docgenInfo,name:"Spacing",path:"src/components/common/Spacing/Spacing.tsx#Spacing"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/DailyScheduleModal/DailyScheduleModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>DailyScheduleModal_DailyScheduleModal});var useModal=__webpack_require__("./src/hooks/useModal.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.I4.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`,Container=styled_components_browser_esm.I4.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: ${({theme})=>theme.zIndex.MODAL};

  width: 250px;
  max-height: 338px;
  padding: 10px 20px 20px 20px;

  border-radius: 10px;
  background-color: ${({theme})=>theme.color.WHITE};

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;

  ${({$css})=>$css};
`,Header=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 38px;
  padding-bottom: 4px;
  margin-bottom: 12px;

  border-bottom: ${({theme})=>`1px solid ${theme.color.GRAY300}`};
`,ScheduleWrapper=styled_components_browser_esm.I4.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  overflow: auto;

  width: 100%;
  max-height: 80%;
  height: auto;

  gap: 10px;
`,ScheduleBox=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;
  column-gap: 10px;

  background-color: ${({theme,$teamPlaceColor})=>theme.teamColor[$teamPlaceColor]};
  border-radius: 4px;

  color: ${({theme})=>theme.color.WHITE};

  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: 0.2s;
  }
`,closeButton=styled_components_browser_esm.AH`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 22px;
  height: 38px;
  padding: 8px 0;
`,teamName=styled_components_browser_esm.AH`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 200px;
`,modalLocation=(row,column,calendarWidth,calendarLeft,calendarSize,isMobile)=>isMobile?styled_components_browser_esm.AH`
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);
    `:"md"===calendarSize?styled_components_browser_esm.AH`
      position: absolute;
      top: ${148+(row>3?-228:0)+110*row}px;
      left: ${(column>3?-250:calendarWidth/7)+calendarLeft+calendarWidth*column/7}px;
    `:"sm"==calendarSize?styled_components_browser_esm.AH`
      position: fixed;
      top: 23%;
      left: 19%;
    `:void 0;var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),parseDate=__webpack_require__("./src/utils/parseDate.ts"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),schedule=__webpack_require__("./src/apis/schedule.ts"),query=__webpack_require__("./src/constants/query.ts");var useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),getIsMobile=__webpack_require__("./src/utils/getIsMobile.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const DailyScheduleModal=props=>{const{rawDate,calendarSize="md",calendarWidth,calendarLeft,position,onScheduleModalOpen,onSetModalType}=props,{row,column}=position,{closeModal}=(0,useModal.h)(),{teamPlaceColor,teamPlaceId}=(0,useTeamPlace.Y)(),isMobile=(0,getIsMobile.N)(),{year,month,date}=(0,parseDate._)(rawDate),schedules=((teamPlaceId,year,month,day)=>{const stringYear=String(year).padStart(4,"0"),stringMonth=String(month+1).padStart(2,"0"),stringDay=String(day).padStart(2,"0"),{data}=(0,useQuery.I)(["dailySchedules",year,month,day],(()=>(0,schedule.Zn)(teamPlaceId,`${stringYear}${stringMonth}${stringDay}`,`${stringYear}${stringMonth}${stringDay}`)),{enabled:teamPlaceId>0,staleTime:query.S.DAILY_SCHEDULES});if(void 0===data)return[];const{schedules}=data;return schedules})(teamPlaceId,year,month,date);return(0,jsx_runtime.jsxs)(Modal.A,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{$css:modalLocation(row,column,calendarWidth,calendarLeft,calendarSize,isMobile),children:[(0,jsx_runtime.jsxs)(Header,{children:[(0,jsx_runtime.jsxs)(Text.A,{children:[month+1,"월 ",date,"일"]}),(0,jsx_runtime.jsx)(Button.A,{variant:"plain",type:"button",onClick:closeModal,css:closeButton,"aria-label":"닫기",children:(0,jsx_runtime.jsx)(svg.US,{})})]}),(0,jsx_runtime.jsx)(ScheduleWrapper,{children:0!==schedules.length?schedules.map(((schedule,index)=>{const{id,title}=schedule;return(0,jsx_runtime.jsx)(ScheduleBox,{$teamPlaceColor:teamPlaceColor,title,onClick:()=>{onScheduleModalOpen({scheduleId:id,row,column,level:4}),onSetModalType()},children:(0,jsx_runtime.jsx)(Text.A,{css:teamName,children:title})},index)})):(0,jsx_runtime.jsx)(Text.A,{css:teamName,children:"등록된 일정이 없습니다."})})]})]})};DailyScheduleModal.displayName="DailyScheduleModal";const DailyScheduleModal_DailyScheduleModal=DailyScheduleModal;try{DailyScheduleModal.displayName="DailyScheduleModal",DailyScheduleModal.__docgenInfo={description:"",displayName:"DailyScheduleModal",props:{calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"Position"}},rawDate:{defaultValue:null,description:"",name:"rawDate",required:!0,type:{name:"Date"}},calendarWidth:{defaultValue:null,description:"",name:"calendarWidth",required:!0,type:{name:"number"}},calendarLeft:{defaultValue:null,description:"",name:"calendarLeft",required:!0,type:{name:"number"}},onScheduleModalOpen:{defaultValue:null,description:"",name:"onScheduleModalOpen",required:!0,type:{name:"({ scheduleId, row, column, level, }: SchedulePosition & { scheduleId: number; }) => void"}},onSetModalType:{defaultValue:null,description:"",name:"onSetModalType",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/DailyScheduleModal/DailyScheduleModal.tsx#DailyScheduleModal"]={docgenInfo:DailyScheduleModal.__docgenInfo,name:"DailyScheduleModal",path:"src/components/team_calendar/DailyScheduleModal/DailyScheduleModal.tsx#DailyScheduleModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>FakeScheduleBarsScreen_FakeScheduleBarsScreen});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.I4.div.attrs((({$relativeX,$relativeY})=>({style:{transform:`translate(${$relativeX}px, ${$relativeY}px)`}})))`
  display: flex;
  flex-direction: column;
  position: absolute;

  width: 100%;
  height: 100%;
`,CalendarRow=styled_components_browser_esm.I4.div`
  position: relative;
  flex-grow: 1;
`;var ScheduleBar=__webpack_require__("./src/components/team_calendar/ScheduleBar/ScheduleBar.tsx"),arrayOf=__webpack_require__("./src/utils/arrayOf.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const FakeScheduleBarsScreen=props=>{const{mode,scheduleBars}=props;return(0,jsx_runtime.jsx)(Container,{$relativeX:"schedule"===mode?props.relativeX:0,$relativeY:"schedule"===mode?props.relativeY:0,children:(0,arrayOf.j)(6).map(((_,rowIndex)=>(0,jsx_runtime.jsx)(CalendarRow,{children:scheduleBars.map((scheduleBar=>scheduleBar.row===rowIndex?(0,jsx_runtime.jsx)(ScheduleBar.A,{...scheduleBar,mode:"schedule"===mode?"no-interaction":"indicator"},scheduleBar.id):null))},rowIndex)))})};FakeScheduleBarsScreen.displayName="FakeScheduleBarsScreen";const FakeScheduleBarsScreen_FakeScheduleBarsScreen=FakeScheduleBarsScreen;try{FakeScheduleBarsScreen.displayName="FakeScheduleBarsScreen",FakeScheduleBarsScreen.__docgenInfo={description:"",displayName:"FakeScheduleBarsScreen",props:{mode:{defaultValue:null,description:"",name:"mode",required:!0,type:{name:"enum",value:[{value:'"schedule"'},{value:'"indicator"'}]}},scheduleBars:{defaultValue:null,description:"",name:"scheduleBars",required:!0,type:{name:"GeneratedScheduleBar[]"}},relativeX:{defaultValue:null,description:"",name:"relativeX",required:!0,type:{name:"number"}},relativeY:{defaultValue:null,description:"",name:"relativeY",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.tsx#FakeScheduleBarsScreen"]={docgenInfo:FakeScheduleBarsScreen.__docgenInfo,name:"FakeScheduleBarsScreen",path:"src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.tsx#FakeScheduleBarsScreen"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/ICalendarModal/ICalendarModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ICalendarModal_ICalendarModal});var react=__webpack_require__("./node_modules/react/index.js"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Spacing=__webpack_require__("./src/components/common/Spacing/Spacing.tsx"),useModal=__webpack_require__("./src/hooks/useModal.ts"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),schedule=__webpack_require__("./src/apis/schedule.ts"),query=__webpack_require__("./src/constants/query.ts");var useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.Ay.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.Ay.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  ${({$calendarSize,$isMobile})=>"md"===$calendarSize||$isMobile?styled_components_browser_esm.AH`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `:"sm"===$calendarSize?styled_components_browser_esm.AH`
        top: 25%;
        left: 14.4%;
      `:void 0}

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.AH`
        width: 300px;
        height: 180px;
        padding: 10px 20px;
      `:styled_components_browser_esm.AH`
      width: 360px;
      height: 190px;
      padding: 16px;
    `}
 
  border-radius: 8px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({theme})=>theme.color.WHITE};
`,Header=styled_components_browser_esm.Ay.div`
  position: relative;
  display: flex;
  align-items: center;

  & > button {
    margin-left: auto;
  }
`,TooltipWrapper=styled_components_browser_esm.Ay.div`
  display: flex;
  align-items: center;

  cursor: help;
`,Tooltip=styled_components_browser_esm.Ay.div`
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
`,UrlContainer=styled_components_browser_esm.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid ${({theme})=>theme.color.GRAY300};
  border-radius: 8px;

  margin: 10px 0 20px 0;
`,UrlWrapper=styled_components_browser_esm.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 90%;
  height: 36px;
  padding: 0 8px;

  & > div {
    width: 100%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`,UserGuideLink=styled_components_browser_esm.Ay.a`
  align-self: flex-start;
`,closeButton=styled_components_browser_esm.AH`
  width: 28px;
  height: 28px;
  padding: 0;
  margin-bottom: 4px;

  svg {
    width: 28px;
    height: 28px;
  }
`,copyButton=styled_components_browser_esm.AH`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 40px;
  padding: 0;

  background-color: ${({theme})=>theme.color.GRAY100};
  border-radius: 0 8px 8px 0;
`,shortcutText=styled_components_browser_esm.AH`
  color: ${({theme})=>theme.color.GRAY800};
`;var constants_url=__webpack_require__("./src/constants/url.ts"),getIsMobile=__webpack_require__("./src/utils/getIsMobile.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ICalendarModal=props=>{const{calendarSize="md"}=props,{closeModal}=(0,useModal.h)(),{showToast}=(0,useToast.d)(),{teamPlaceId}=(0,useTeamPlace.Y)(),isMobile=(0,getIsMobile.N)(),{url}=(teamPlaceId=>{const{data}=(0,useQuery.I)(["iCalendarUrl",teamPlaceId],(()=>(0,schedule.F_)(teamPlaceId)),{enabled:teamPlaceId>0,staleTime:query.S.ICALENDAR_URL,meta:{errorMessage:"일정 내보내기에 실패했습니다. \n지속되는 경우 관리자에게 문의해주세요."},placeholderData:{url:"https://assets.teamby.team/prod/ical/1"}});return data??{url:""}})(teamPlaceId),[isTooltipOpen,setIsTooltipOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)(Modal.A,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{$calendarSize:calendarSize,$isMobile:isMobile,children:[(0,jsx_runtime.jsxs)(Header,{children:[(0,jsx_runtime.jsx)(Text.A,{as:"span",size:"xl",weight:"semiBold",children:"일정 내보내기"}),(0,jsx_runtime.jsx)(Spacing.A,{size:6,direction:"horizontal"}),(0,jsx_runtime.jsxs)(TooltipWrapper,{tabIndex:0,onFocus:()=>setIsTooltipOpen(!0),onBlur:()=>setIsTooltipOpen(!1),onMouseEnter:()=>setIsTooltipOpen(!0),onMouseLeave:()=>setIsTooltipOpen(!1),children:[(0,jsx_runtime.jsx)(svg.uI,{}),isTooltipOpen&&(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(Tooltip,{role:"tooltip",children:(0,jsx_runtime.jsxs)(Text.A,{children:["팀바팀 캘린더에 등록된 일정을 ",(0,jsx_runtime.jsx)("br",{}),"구글 캘린더, iOS 캘린더 앱 등에서 사용 가능한"," ",(0,jsx_runtime.jsx)(Text.A,{as:"span",weight:"semiBold",children:".ics"})," ","파일로 내보내는 기능입니다."]})})})]}),(0,jsx_runtime.jsx)(Button.A,{variant:"plain",type:"button",onClick:closeModal,"aria-label":"일정 내보내기 모달 닫기",css:closeButton,children:(0,jsx_runtime.jsx)(svg.US,{})})]}),!isMobile&&(0,jsx_runtime.jsx)(Spacing.A,{size:16}),(0,jsx_runtime.jsx)(Text.A,{as:"span",weight:"semiBold",children:"일정 파일(.ics) 경로"}),(0,jsx_runtime.jsxs)(UrlContainer,{children:[(0,jsx_runtime.jsx)(UrlWrapper,{children:(0,jsx_runtime.jsx)("div",{title:url,children:(0,jsx_runtime.jsx)(Text.A,{as:"span",children:""===url?"경로를 불러오는 데 실패했습니다.":url})})}),(0,jsx_runtime.jsx)(Button.A,{type:"button",variant:"plain",css:copyButton,onClick:()=>{if(""!==url)try{navigator.clipboard.writeText(url),showToast("success","일정 파일(.ics) 경로가 복사되었습니다.")}catch(error){showToast("error","일정 파일(.ics) 경로 복사에 실패했습니다.")}},"aria-label":"일정 내보내기 링크 복사하기",disabled:""===url,children:(0,jsx_runtime.jsx)(svg.ui,{})})]}),(0,jsx_runtime.jsx)(UserGuideLink,{href:constants_url.f5,target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(Text.A,{as:"span",size:"lg",weight:"semiBold",css:shortcutText,children:"📘 일정 파일(.ics) 사용법"})})]})]})};ICalendarModal.displayName="ICalendarModal";const ICalendarModal_ICalendarModal=ICalendarModal;try{ICalendarModal.displayName="ICalendarModal",ICalendarModal.__docgenInfo={description:"",displayName:"ICalendarModal",props:{calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ICalendarModal/ICalendarModal.tsx#ICalendarModal"]={docgenInfo:ICalendarModal.__docgenInfo,name:"ICalendarModal",path:"src/components/team_calendar/ICalendarModal/ICalendarModal.tsx#ICalendarModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ScheduleAddModal_ScheduleAddModal});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.I4.div`
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
`,Header=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 34px;
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
`,CheckboxContainer=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  column-gap: 8px;
`,TimeSelectContainer=styled_components_browser_esm.I4.div`
  display: flex;

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

  width: ${({$isMobile})=>!$isMobile&&"calc(100% - 80px)"};

  margin-left: ${({$isMobile})=>!$isMobile&&"auto"};
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
`,title=styled_components_browser_esm.AH`
  padding: 10px 20px;

  border: none;
  border-radius: 10px;
  background-color: ${({theme})=>theme.color.GRAY200};

  font-size: 18px;
`,closeButton=styled_components_browser_esm.AH`
  width: 28px;
  height: 28px;
  padding: 0;
  margin-bottom: 4px;

  svg {
    width: 28px;
    height: 28px;
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
  width: 80px;
  padding: 0;
`;var useModal=__webpack_require__("./src/hooks/useModal.ts"),svg=__webpack_require__("./src/assets/svg/index.ts"),Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),schedule=__webpack_require__("./src/apis/schedule.ts");const useSendSchedule=teamPlaceId=>{const queryClient=(0,QueryClientProvider.jE)(),{mutate}=(0,useMutation.n)((body=>(0,schedule.iR)(teamPlaceId,body)),{onSuccess:()=>{queryClient.invalidateQueries(["schedules",teamPlaceId]),queryClient.invalidateQueries(["mySchedules"]),queryClient.invalidateQueries(["myDailySchedules"])}});return{mutateSendSchedule:mutate}};var typeGuard=__webpack_require__("./src/types/typeGuard.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),useDateTimeRange=__webpack_require__("./src/hooks/schedule/useDateTimeRange.ts");var Checkbox=__webpack_require__("./src/components/common/Checkbox/Checkbox.tsx"),TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),TimeTableMenu=__webpack_require__("./src/components/team_calendar/TimeTableMenu/TimeTableMenu.tsx"),react=__webpack_require__("./node_modules/react/index.js"),getIsMobile=__webpack_require__("./src/utils/getIsMobile.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleAddModal=props=>{const{clickedDate,calendarSize="md"}=props,{closeModal}=(0,useModal.h)(),{teamPlaceColor,displayName}=(0,useTeamPlace.Y)(),isMobile=(0,getIsMobile.N)(),{schedule,isAllDay,times,handlers:{handleScheduleChange,handleScheduleBlur,handleIsAllDayChange,handleStartTimeChange,handleEndTimeChange,handleScheduleSubmit}}=(clickedDate=>{const{title,startDate,endDate,startTime,endTime,isValid,isAllDay,handleScheduleChange,handleScheduleBlur,handleStartTimeChange,handleEndTimeChange,handleIsAllDayChange}=(0,useDateTimeRange.a)(clickedDate,""),{closeModal}=(0,useModal.h)(),{showToast}=(0,useToast.d)(),{teamPlaceId}=(0,useTeamPlace.Y)(),{mutateSendSchedule}=useSendSchedule(teamPlaceId);return{schedule:{title,startDate,endDate},isAllDay,times:{startTime,endTime},handlers:{handleScheduleChange,handleScheduleBlur,handleIsAllDayChange,handleStartTimeChange,handleEndTimeChange,handleScheduleSubmit:e=>{e.preventDefault();const startDateTime=`${startDate} ${startTime}`,endDateTime=`${endDate} ${endTime}`;(0,typeGuard.v)(startDateTime)&&(0,typeGuard.v)(endDateTime)&&(isValid?mutateSendSchedule({title,startDateTime,endDateTime},{onSuccess:()=>{showToast("success","일정이 등록되었습니다."),closeModal()},onError:error=>{500===error.status&&showToast("error","일정 제목이 최대 글자(250자)를 초과했습니다.")}}):showToast("error","날짜/시간 형식이 올바르지 않습니다. 올바르게 입력 후 다시 시도해 주세요."))}}}})(clickedDate),titleInputRef=(0,react.useRef)(null);return(0,react.useEffect)((()=>{titleInputRef.current?.focus()}),[]),(0,jsx_runtime.jsxs)(Modal.A,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{$calendarSize:calendarSize,$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Header,{children:(0,jsx_runtime.jsx)(Button.A,{variant:"plain",type:"button",onClick:closeModal,css:closeButton,"aria-label":"일정 등록 모달 닫기",children:(0,jsx_runtime.jsx)(svg.US,{})})}),(0,jsx_runtime.jsxs)("form",{onSubmit:handleScheduleSubmit,children:[(0,jsx_runtime.jsx)(TitleWrapper,{children:(0,jsx_runtime.jsx)(Input.A,{width:"100%",height:"100%",placeholder:"일정 제목을 입력해 주세요.",css:title,name:"title",maxLength:250,value:schedule.title,ref:titleInputRef,required:!0,onChange:handleScheduleChange})}),(0,jsx_runtime.jsxs)(TimeSelectContainer,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Text.A,{size:"lg",weight:"semiBold",children:"일정 시작"}),(0,jsx_runtime.jsxs)(InputWrapper,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Input.A,{width:isAllDay?"100%":"50%",height:"40px",type:"date",css:dateTimeLocalInput,name:"startDate",value:schedule.startDate,onChange:handleScheduleChange,onBlur:handleScheduleBlur,"aria-label":`일정 시작 일자는 ${schedule.startDate} 입니다`,required:!0}),!isAllDay&&(0,jsx_runtime.jsx)(TimeTableMenu.A,{displayValue:times.startTime,onSelect:handleStartTimeChange})]})]}),(0,jsx_runtime.jsxs)(TimeSelectContainer,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Text.A,{size:"lg",weight:"semiBold",children:"일정 마감"}),(0,jsx_runtime.jsxs)(InputWrapper,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Input.A,{width:isAllDay?"100%":"50%",height:"40px",type:"date",css:dateTimeLocalInput,name:"endDate",value:schedule.endDate,"aria-label":`일정 마감 일자는 ${schedule.endDate} 입니다`,onChange:handleScheduleChange,onBlur:handleScheduleBlur,required:!0}),!isAllDay&&(0,jsx_runtime.jsx)(TimeTableMenu.A,{displayValue:times.endTime,onSelect:handleEndTimeChange})]})]}),(0,jsx_runtime.jsxs)(CheckboxContainer,{children:[(0,jsx_runtime.jsx)(Text.A,{size:"md",weight:"semiBold",children:"종일"}),(0,jsx_runtime.jsx)(Checkbox.A,{size:"sm",isChecked:isAllDay,onChange:handleIsAllDayChange}),(0,jsx_runtime.jsx)("p",{className:"hidden","aria-live":"assertive","aria-relevant":"additions",children:isAllDay?"종일 일정이 선택되었습니다.":"종일 일정이 해제되었습니다."})]}),(0,jsx_runtime.jsxs)(InnerContainer,{children:[(0,jsx_runtime.jsxs)(TeamNameContainer,{title:displayName,children:[(0,jsx_runtime.jsx)(TeamBadge.A,{teamPlaceColor,size:"lg"}),!isMobile&&(0,jsx_runtime.jsx)(Text.A,{css:teamPlaceName,children:displayName})]}),(0,jsx_runtime.jsx)(ControlButtonWrapper,{children:(0,jsx_runtime.jsx)(Button.A,{variant:"primary",css:submitButton,children:"등록"})})]})]})]})]})};ScheduleAddModal.displayName="ScheduleAddModal";const ScheduleAddModal_ScheduleAddModal=ScheduleAddModal;try{ScheduleAddModal.displayName="ScheduleAddModal",ScheduleAddModal.__docgenInfo={description:"",displayName:"ScheduleAddModal",props:{calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},clickedDate:{defaultValue:null,description:"",name:"clickedDate",required:!0,type:{name:"Date"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.tsx#ScheduleAddModal"]={docgenInfo:ScheduleAddModal.__docgenInfo,name:"ScheduleAddModal",path:"src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.tsx#ScheduleAddModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/ScheduleBar/ScheduleBar.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ScheduleBar_ScheduleBar});var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.I4.div.withConfig({shouldForwardProp:prop=>!["id","scheduleId","schedule","calendarSize","level","row","column","duration","roundedStart","roundedEnd","mode"].includes(prop)})`
  position: absolute;
  ${({calendarSize,level})=>"md"===calendarSize?styled_components_browser_esm.AH`
        top: ${18*level+36}px;
        height: 16px;
      `:"sm"===calendarSize?styled_components_browser_esm.AH`
        top: ${14*level+22}px;
        height: 12px;
      `:void 0}

  left: ${({column})=>100*column/7}%;
  width: ${({duration})=>100*duration/7}%;
  padding: ${({roundedStart,roundedEnd})=>`0 ${roundedEnd?"4px":0} 0 ${roundedStart?"4px":0}`};
`,Inner=styled_components_browser_esm.I4.div.withConfig({shouldForwardProp:prop=>!["id","scheduleId","schedule","row","column","duration","level","roundedStart","roundedEnd","teamPlaceColor","mode"].includes(prop)})`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  padding-left: 6px;

  background-color: ${({theme,teamPlaceColor=0,mode})=>"indicator"===mode?"transparent":theme.teamColor[teamPlaceColor]};
  border-radius: ${({roundedStart,roundedEnd})=>`${roundedStart?"4px":"0"} ${roundedEnd?"4px 4px":"0 0"} ${roundedStart?"4px":"0"}`};

  ${({mode,theme})=>"indicator"===mode&&styled_components_browser_esm.AH`
      margin-top: -2px;

      border: 2px solid ${theme.color.GRAY400};

      box-shadow: 0 0 24px ${theme.color.GRAY600};
      box-sizing: content-box;
    `};

  ${({mode,level})=>"indicator"!==mode&&styled_components_browser_esm.AH`
      filter: brightness(${1+.4*level});
    `};

  ${({mode})=>"normal"===mode&&styled_components_browser_esm.AH`
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    `};
`,scheduleBarTitle=calendarSize=>styled_components_browser_esm.AH`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 100px;
  height: 100%;

  font-size: ${"md"===calendarSize?12:10}px;
  color: ${({theme})=>theme.color.WHITE};
`;var svg=__webpack_require__("./src/assets/svg/index.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleBar=props=>{const{title,onClick,roundedEnd,onDragStart,mode="normal",calendarSize="md",...rest}=props,{teamPlaceColor}=(0,useTeamPlace.Y)(),isInteractive="normal"===mode,isIndicator="indicator"===mode;return(0,jsx_runtime.jsx)(Wrapper,{title:isInteractive?title:void 0,onClick,onDragStart,roundedEnd,calendarSize,draggable:isInteractive,mode,...rest,children:(0,jsx_runtime.jsxs)(Inner,{teamPlaceColor,roundedEnd,mode,...rest,children:[!isIndicator&&(0,jsx_runtime.jsx)(Text.A,{as:"span",css:scheduleBarTitle(calendarSize),children:title}),!roundedEnd&&!isIndicator&&(0,jsx_runtime.jsx)(svg.QZ,{})]})})};ScheduleBar.displayName="ScheduleBar";const ScheduleBar_ScheduleBar=ScheduleBar;try{ScheduleBar.displayName="ScheduleBar",ScheduleBar.__docgenInfo={description:"",displayName:"ScheduleBar",props:{onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},onDragStart:{defaultValue:null,description:"",name:"onDragStart",required:!1,type:{name:"((e: MouseEvent<Element, MouseEvent>) => void)"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},scheduleId:{defaultValue:null,description:"",name:"scheduleId",required:!0,type:{name:"number"}},schedule:{defaultValue:null,description:"",name:"schedule",required:!0,type:{name:"Schedule"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},row:{defaultValue:null,description:"",name:"row",required:!0,type:{name:"number"}},column:{defaultValue:null,description:"",name:"column",required:!0,type:{name:"number"}},duration:{defaultValue:null,description:"",name:"duration",required:!0,type:{name:"number"}},level:{defaultValue:null,description:"",name:"level",required:!0,type:{name:"number"}},roundedStart:{defaultValue:null,description:"",name:"roundedStart",required:!0,type:{name:"boolean"}},roundedEnd:{defaultValue:null,description:"",name:"roundedEnd",required:!0,type:{name:"boolean"}},calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},mode:{defaultValue:null,description:"",name:"mode",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"no-interaction"'},{value:'"indicator"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleBar/ScheduleBar.tsx#ScheduleBar"]={docgenInfo:ScheduleBar.__docgenInfo,name:"ScheduleBar",path:"src/components/team_calendar/ScheduleBar/ScheduleBar.tsx#ScheduleBar"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ScheduleEditModal_ScheduleEditModal});var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),useModal=__webpack_require__("./src/hooks/useModal.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.I4.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.I4.div`
  position: fixed;
  display: flex;
  flex-direction: column;
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
`,Header=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 34px;
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
`,CheckboxContainer=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  column-gap: 8px;
`,TimeSelectContainer=styled_components_browser_esm.I4.div`
  display: flex;

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

  width: ${({$isMobile})=>!$isMobile&&"calc(100% - 80px)"};

  margin-left: ${({$isMobile})=>!$isMobile&&"auto"};
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
`,title=styled_components_browser_esm.AH`
  padding: 10px 20px;

  border: none;
  border-radius: 10px;
  background-color: ${({theme})=>theme.color.GRAY200};

  font-size: 18px;
`,closeButton=styled_components_browser_esm.AH`
  width: 28px;
  height: 28px;
  padding: 0;
  margin-bottom: 4px;

  svg {
    width: 28px;
    height: 28px;
  }
`,dateTimeLocalInput=styled_components_browser_esm.AH`
  border-radius: 4px;

  text-align: center;
`,teamPlaceName=styled_components_browser_esm.AH`
  overflow: hidden;

  max-width: 250px;

  text-overflow: ellipsis;
  white-space: nowrap;
`,submitButton=styled_components_browser_esm.AH`
  width: 80px;
  padding: 0;
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),useModifySchedule=__webpack_require__("./src/hooks/queries/useModifySchedule.ts"),typeGuard=__webpack_require__("./src/types/typeGuard.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),useDateTimeRange=__webpack_require__("./src/hooks/schedule/useDateTimeRange.ts");var TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),TimeTableMenu=__webpack_require__("./src/components/team_calendar/TimeTableMenu/TimeTableMenu.tsx"),Checkbox=__webpack_require__("./src/components/common/Checkbox/Checkbox.tsx"),getIsMobile=__webpack_require__("./src/utils/getIsMobile.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleEditModal=props=>{const{scheduleId,initialSchedule,calendarSize="md"}=props,isMobile=(0,getIsMobile.N)(),{closeModal}=(0,useModal.h)(),{teamPlaceColor,displayName}=(0,useTeamPlace.Y)(),{schedule,times,isAllDay,handlers:{handleScheduleChange,handleScheduleBlur,handleScheduleSubmit,handleStartTimeChange,handleEndTimeChange,handleIsAllDayChange}}=((scheduleId,initialSchedule)=>{const{title,startDate,endDate,startTime,endTime,isValid,isAllDay,handleScheduleChange,handleScheduleBlur,handleStartTimeChange,handleEndTimeChange,handleIsAllDayChange}=(0,useDateTimeRange.a)(initialSchedule,initialSchedule?.title),{closeModal}=(0,useModal.h)(),{showToast}=(0,useToast.d)(),{teamPlaceId}=(0,useTeamPlace.Y)(),{mutateModifySchedule}=(0,useModifySchedule.d)(teamPlaceId,scheduleId);return{schedule:{title,startDate,endDate},times:{startTime,endTime},isAllDay,handlers:{handleScheduleChange,handleScheduleBlur,handleScheduleSubmit:e=>{e.preventDefault();const startDateTime=`${startDate} ${startTime}`,endDateTime=`${endDate} ${endTime}`;(0,typeGuard.v)(startDateTime)&&(0,typeGuard.v)(endDateTime)&&(isValid?mutateModifySchedule({title,startDateTime,endDateTime},{onSuccess:()=>{showToast("success","일정이 수정되었습니다."),closeModal()},onError:error=>{500===error.status&&showToast("error","일정 제목이 최대 글자(250자)를 초과했습니다.")}}):showToast("error","날짜/시간 형식이 올바르지 않습니다. 올바르게 입력 후 다시 시도해 주세요."))},handleStartTimeChange,handleEndTimeChange,handleIsAllDayChange}}})(scheduleId,initialSchedule);return void 0===initialSchedule?null:(0,jsx_runtime.jsxs)(Modal.A,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{$calendarSize:calendarSize,$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Header,{children:(0,jsx_runtime.jsx)(Button.A,{variant:"plain",type:"button",onClick:closeModal,css:closeButton,"aria-label":"닫기",children:(0,jsx_runtime.jsx)(svg.US,{})})}),(0,jsx_runtime.jsxs)("form",{onSubmit:handleScheduleSubmit,children:[(0,jsx_runtime.jsx)(TitleWrapper,{children:(0,jsx_runtime.jsx)(Input.A,{width:"100%",height:"100%",placeholder:"일정 제목",css:title,name:"title",value:schedule.title,required:!0,onChange:handleScheduleChange})}),(0,jsx_runtime.jsxs)(TimeSelectContainer,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Text.A,{size:"lg",weight:"semiBold",children:"일정 시작"}),(0,jsx_runtime.jsxs)(InputWrapper,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Input.A,{width:isAllDay?"100%":"50%",height:"40px",type:"date",css:dateTimeLocalInput,name:"startDate",value:schedule.startDate,onChange:handleScheduleChange,onBlur:handleScheduleBlur,required:!0}),!isAllDay&&(0,jsx_runtime.jsx)(TimeTableMenu.A,{displayValue:times.startTime,onSelect:handleStartTimeChange})]})]}),(0,jsx_runtime.jsxs)(TimeSelectContainer,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Text.A,{size:"lg",weight:"semiBold",children:"일정 마감"}),(0,jsx_runtime.jsxs)(InputWrapper,{$isMobile:isMobile,children:[(0,jsx_runtime.jsx)(Input.A,{width:isAllDay?"100%":"50%",height:"40px",type:"date",css:dateTimeLocalInput,name:"endDate",value:schedule.endDate,min:schedule.startDate,onChange:handleScheduleChange,onBlur:handleScheduleBlur,required:!0}),!isAllDay&&(0,jsx_runtime.jsx)(TimeTableMenu.A,{displayValue:times.endTime,onSelect:handleEndTimeChange})]})]}),(0,jsx_runtime.jsxs)(CheckboxContainer,{children:[(0,jsx_runtime.jsx)(Text.A,{size:"md",weight:"semiBold",children:"종일"}),(0,jsx_runtime.jsx)(Checkbox.A,{size:"sm",isChecked:isAllDay,onChange:handleIsAllDayChange})]}),(0,jsx_runtime.jsxs)(InnerContainer,{children:[(0,jsx_runtime.jsxs)(TeamNameContainer,{title:displayName,children:[(0,jsx_runtime.jsx)(TeamBadge.A,{teamPlaceColor,size:"lg"}),!isMobile&&(0,jsx_runtime.jsx)(Text.A,{css:teamPlaceName,children:displayName})]}),(0,jsx_runtime.jsx)(ControlButtonWrapper,{children:(0,jsx_runtime.jsx)(Button.A,{variant:"primary",css:submitButton,children:"수정"})})]})]})]})]})};ScheduleEditModal.displayName="ScheduleEditModal";const ScheduleEditModal_ScheduleEditModal=ScheduleEditModal;try{ScheduleEditModal.displayName="ScheduleEditModal",ScheduleEditModal.__docgenInfo={description:"",displayName:"ScheduleEditModal",props:{calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},scheduleId:{defaultValue:null,description:"",name:"scheduleId",required:!0,type:{name:"number"}},initialSchedule:{defaultValue:null,description:"",name:"initialSchedule",required:!1,type:{name:"Schedule"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.tsx#ScheduleEditModal"]={docgenInfo:ScheduleEditModal.__docgenInfo,name:"ScheduleEditModal",path:"src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.tsx#ScheduleEditModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/ScheduleModal/ScheduleModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ScheduleModal_ScheduleModal});var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),useModal=__webpack_require__("./src/hooks/useModal.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.I4.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: ${({theme})=>theme.zIndex.MODAL};
  gap: 16px;

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.AH`
        width: 300px;
        padding: 10px 10px 20px 26px;
      `:styled_components_browser_esm.AH`
      width: 446px;
      padding: 18px 22px;
    `}

  border-radius: 10px;
  background-color: ${({theme})=>theme.color.WHITE};

  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;

  ${({$css})=>$css};
`,Backdrop=styled_components_browser_esm.I4.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`,Header=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,TeamWrapper=styled_components_browser_esm.I4.div`
  display: flex;
  gap: 12px;
`,MenuContainer=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  gap: 6px;
`,PeriodWrapper=styled_components_browser_esm.I4.div`
  display: flex;

  gap: 2px;

  ${({$isMobile})=>$isMobile?styled_components_browser_esm.AH`
        flex-direction: column;
      `:styled_components_browser_esm.AH`
      align-items: center;
    `}
`,teamName=styled_components_browser_esm.AH`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 200px;
`,menuIcon=styled_components_browser_esm.AH`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  padding: 0;

  border-radius: 8px;

  svg {
    width: 28px;
    height: 28px;
  }

  &:hover {
    background-color: ${({theme})=>theme.color.GRAY100};
  }
`,modalLocation=(row,column,level,calendarWidth,calendarLeft,calendarSize,isMobile)=>isMobile?styled_components_browser_esm.AH`
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);
    `:"md"===calendarSize?styled_components_browser_esm.AH`
      position: absolute;
      top: ${(row<3?92:-128)+110*(row+1)+18*level}px;
      left: ${(column>3?calendarWidth/7-446:3===column?calendarWidth/14-223:0)+calendarLeft+calendarWidth*column/7}px;
    `:"sm"==calendarSize?styled_components_browser_esm.AH`
      position: fixed;
      top: 26%;
      left: 12%;
    `:void 0,scheduleTitleText=styled_components_browser_esm.AH`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  width: 100%;
`;var svg=__webpack_require__("./src/assets/svg/index.ts"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),schedule=__webpack_require__("./src/apis/schedule.ts");var QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs");var TeamBadge=__webpack_require__("./src/components/team/TeamBadge/TeamBadge.tsx"),useToast=__webpack_require__("./src/hooks/useToast.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),getIsMobile=__webpack_require__("./src/utils/getIsMobile.ts");const formatDateTime=rawDateTime=>{const[rawDate,time]=rawDateTime.split(" "),date=rawDate.split("-");return`${date[0]}년 ${date[1]}월 ${date[2]}일 ${time}`},generateDateTimeRangeDescription=(startDateTime,endDateTime)=>{const[startDate]=startDateTime.split(" "),[endDate,endTime]=endDateTime.split(" "),formattedStartDateTime=formatDateTime(startDateTime),formattedEndDateTime=formatDateTime(endDateTime),formattedStartDate=formattedStartDateTime.split(" ").slice(0,3).join(" "),formattedEndDate=formattedEndDateTime.split(" ").slice(0,3).join(" ");return startDateTime===endDateTime?formattedStartDateTime:"23:59"===endTime?startDate===endDate?formattedStartDate:`${formattedStartDate} ~ ${formattedEndDate}`:`${formattedStartDateTime} ~ ${formattedEndDateTime}`};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleModal=props=>{const{calendarWidth,calendarLeft,scheduleId,position,onOpenScheduleEditModal,calendarSize="md"}=props,{closeModal}=(0,useModal.h)(),{showToast}=(0,useToast.d)(),{teamPlaceColor,teamPlaceId,displayName}=(0,useTeamPlace.Y)(),isMobile=(0,getIsMobile.N)(),{scheduleById}=((teamPlaceId,scheduleId)=>{const{data:scheduleById}=(0,useQuery.I)(["schedule",teamPlaceId,scheduleId],(()=>(0,schedule.o6)(teamPlaceId,scheduleId)),{enabled:teamPlaceId>0});return{scheduleById}})(teamPlaceId,scheduleId),{mutateDeleteSchedule}=((teamPlaceId,scheduleId)=>{const queryClient=(0,QueryClientProvider.jE)(),{mutate}=(0,useMutation.n)((()=>(0,schedule.VD)(teamPlaceId,scheduleId)),{onSuccess:()=>{queryClient.invalidateQueries(["schedules",teamPlaceId]),queryClient.removeQueries(["schedule",teamPlaceId,scheduleId]),queryClient.invalidateQueries(["mySchedules"]),queryClient.invalidateQueries(["myDailySchedules"])},onError:()=>{throw alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요."),new Error}});return{mutateDeleteSchedule:mutate}})(teamPlaceId,scheduleId);if(void 0===scheduleById)return;const{title,startDateTime,endDateTime}=scheduleById,{row,column,level}=position;return(0,jsx_runtime.jsxs)(Modal.A,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:closeModal}),(0,jsx_runtime.jsxs)(Container,{$isMobile:isMobile,$css:modalLocation(row,column,level,calendarWidth,calendarLeft,calendarSize,isMobile),children:[(0,jsx_runtime.jsxs)(Header,{children:[(0,jsx_runtime.jsxs)(TeamWrapper,{children:[(0,jsx_runtime.jsx)(TeamBadge.A,{teamPlaceColor,size:"lg"}),!isMobile&&(0,jsx_runtime.jsx)("div",{title:displayName,children:(0,jsx_runtime.jsx)(Text.A,{css:teamName,children:displayName})})]}),(0,jsx_runtime.jsxs)(MenuContainer,{children:[(0,jsx_runtime.jsx)(Button.A,{type:"button",variant:"plain",onClick:onOpenScheduleEditModal,css:menuIcon,children:(0,jsx_runtime.jsx)(svg.qU,{})}),(0,jsx_runtime.jsx)(Button.A,{type:"button",variant:"plain",onClick:()=>{confirm("일정을 삭제하시겠어요?")&&mutateDeleteSchedule(void 0,{onSuccess:()=>{showToast("success","일정이 삭제되었습니다."),closeModal()}})},css:menuIcon,children:(0,jsx_runtime.jsx)(svg.d7,{})}),(0,jsx_runtime.jsx)(Button.A,{type:"button",variant:"plain",onClick:closeModal,css:menuIcon,children:(0,jsx_runtime.jsx)(svg.US,{})})]})]}),(0,jsx_runtime.jsx)(Text.A,{size:"xxl",weight:"bold",css:scheduleTitleText,children:title}),(0,jsx_runtime.jsx)(PeriodWrapper,{$isMobile:isMobile,children:(0,jsx_runtime.jsx)("time",{children:(0,jsx_runtime.jsx)(Text.A,{children:generateDateTimeRangeDescription(startDateTime,endDateTime)})})}),(0,jsx_runtime.jsx)(Button.A,{type:"button",variant:"primary",css:($isMobile=isMobile,styled_components_browser_esm.AH`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;

  width: 80px;
  height: 42px;
  ${$isMobile&&styled_components_browser_esm.AH`
    margin-right: 10px;
  `}

  cursor: pointer;
`),onClick:closeModal,children:"확인"})]})]});var $isMobile};ScheduleModal.displayName="ScheduleModal";const ScheduleModal_ScheduleModal=ScheduleModal;try{ScheduleModal.displayName="ScheduleModal",ScheduleModal.__docgenInfo={description:"",displayName:"ScheduleModal",props:{calendarWidth:{defaultValue:null,description:"",name:"calendarWidth",required:!0,type:{name:"number"}},calendarLeft:{defaultValue:null,description:"",name:"calendarLeft",required:!0,type:{name:"number"}},calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},scheduleId:{defaultValue:null,description:"",name:"scheduleId",required:!0,type:{name:"number"}},position:{defaultValue:null,description:"",name:"position",required:!0,type:{name:"SchedulePosition"}},onOpenScheduleEditModal:{defaultValue:null,description:"",name:"onOpenScheduleEditModal",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleModal/ScheduleModal.tsx#ScheduleModal"]={docgenInfo:ScheduleModal.__docgenInfo,name:"ScheduleModal",path:"src/components/team_calendar/ScheduleModal/ScheduleModal.tsx#ScheduleModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/ScheduleMoreCell/ScheduleMoreCell.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ScheduleMoreCell_ScheduleMoreCell});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.I4.div.withConfig({shouldForwardProp:prop=>!["column","calendarSize"].includes(prop)})`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${({calendarSize})=>"md"===calendarSize?90:62}px;
  left: ${({column})=>100*column/7}%;

  width: calc(100% / 7);
  height: 16px;

  cursor: pointer;
  &:hover {
    background-color: ${({theme})=>theme.color.GRAY200};
  }

  @media screen and (max-width: 800px) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`,moreText=styled_components_browser_esm.AH`
  color: ${({theme})=>theme.color.GRAY500};
`;var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ScheduleMoreCell=props=>{const{column,onClick,calendarSize="md"}=props;return(0,jsx_runtime.jsx)(Wrapper,{column,calendarSize,onClick,children:(0,jsx_runtime.jsx)(Text.A,{size:"xs",css:moreText,children:"일정 더보기"})})};ScheduleMoreCell.displayName="ScheduleMoreCell";const ScheduleMoreCell_ScheduleMoreCell=ScheduleMoreCell;try{ScheduleMoreCell.displayName="ScheduleMoreCell",ScheduleMoreCell.__docgenInfo={description:"",displayName:"ScheduleMoreCell",props:{calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},column:{defaultValue:null,description:"",name:"column",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/ScheduleMoreCell/ScheduleMoreCell.tsx#ScheduleMoreCell"]={docgenInfo:ScheduleMoreCell.__docgenInfo,name:"ScheduleMoreCell",path:"src/components/team_calendar/ScheduleMoreCell/ScheduleMoreCell.tsx#ScheduleMoreCell"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/query.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{S:()=>STALE_TIME});const STALE_TIME={SCHEDULES:3e4,DAILY_SCHEDULES:3e4,MY_SCHEDULES:3e4,MY_DAILY_SCHEDULES:3e4,USER_INFO:3e5,TEAM_PLACE_MEMBERS:6e4,TEAM_PLACE_INVITE_CODE:1/0,TEAM_LINKS:6e4,TEAM_FEED:3e5,ICALENDAR_URL:1/0}},"./src/constants/url.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{LV:()=>TEAM_BY_TEAM_HOW_TO_USE_URL,f5:()=>ICALENDAR_USER_GUIDE_URL,fH:()=>TEAM_BY_TEAM_REPOSITORY,oi:()=>USER_FEEDBACK_URL});const ICALENDAR_USER_GUIDE_URL="https://teambyteam.notion.site/a99a38a030d74be88e761a1dcb1559a1",USER_FEEDBACK_URL="https://forms.gle/Tk8DZ5Xzsc5615Ar7",TEAM_BY_TEAM_HOW_TO_USE_URL="https://teambyteam.notion.site/f84827ca26334913a1c724dfb9436887",TEAM_BY_TEAM_REPOSITORY="https://github.com/woowacourse-teams/2023-team-by-team"},"./src/hooks/queries/useModifySchedule.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useModifySchedule});var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),_apis_schedule__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/schedule.ts");const useModifySchedule=(teamPlaceId,scheduleId)=>{const queryClient=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.jE)(),{mutate}=(0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.n)((body=>(0,_apis_schedule__WEBPACK_IMPORTED_MODULE_0__.eF)(teamPlaceId,scheduleId,body)),{onSuccess:()=>{queryClient.invalidateQueries(["schedules",teamPlaceId]),queryClient.invalidateQueries(["schedule",teamPlaceId,scheduleId]),queryClient.invalidateQueries(["mySchedules"]),queryClient.invalidateQueries(["myDailySchedules"])}});return{mutateModifySchedule:mutate}}},"./src/hooks/useCalendar.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_:()=>useCalendar});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_constants_calendar__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/constants/calendar.ts"),_utils_arrayOf__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/utils/arrayOf.ts"),_utils_parseDate__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/utils/parseDate.ts");const useCalendar=()=>{const[currentDate,setCurrentDate]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Date),{year,month,date}=(0,_utils_parseDate__WEBPACK_IMPORTED_MODULE_2__._)(currentDate),{day:startDayOfMonth}=(0,_utils_parseDate__WEBPACK_IMPORTED_MODULE_2__._)(new Date(year,month,1)),today=(0,_utils_parseDate__WEBPACK_IMPORTED_MODULE_2__._)(new Date),calendar=((year,month)=>(0,_utils_arrayOf__WEBPACK_IMPORTED_MODULE_3__.j)(_constants_calendar__WEBPACK_IMPORTED_MODULE_1__.T4.ROW_SIZE).map((weekIndex=>(0,_utils_arrayOf__WEBPACK_IMPORTED_MODULE_3__.j)(_constants_calendar__WEBPACK_IMPORTED_MODULE_1__.T4.COLUMN_SIZE).map((dayIndex=>new Date(year,month,7*weekIndex+dayIndex-startDayOfMonth+1))))))(year,month);return{year,month,calendar,currentDate,today,handlers:{handlePrevButtonClick:()=>{setCurrentDate((()=>new Date(year,month-1,date)))},handleNextButtonClick:()=>{setCurrentDate((()=>new Date(year,month+1,date)))}}}}},"./src/utils/generateCalendarRangeByYearMonth.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>generateCalendarRangeByYearMonth});var _constants_calendar__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/constants/calendar.ts"),_utils_generateYYYYMMDDWithoutHyphens__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/utils/generateYYYYMMDDWithoutHyphens.ts");const generateCalendarRangeByYearMonth=(year,month)=>{const firstDateOfMonth=new Date(year,month),firstDateOfCalendar=new Date(firstDateOfMonth.getTime()-_constants_calendar__WEBPACK_IMPORTED_MODULE_0__.CZ*firstDateOfMonth.getDay()),lastDateOfCalendar=new Date(firstDateOfCalendar.getTime()+_constants_calendar__WEBPACK_IMPORTED_MODULE_0__.T4.ROW_SIZE*_constants_calendar__WEBPACK_IMPORTED_MODULE_0__.T4.COLUMN_SIZE*_constants_calendar__WEBPACK_IMPORTED_MODULE_0__.CZ-1);return{startDate:(0,_utils_generateYYYYMMDDWithoutHyphens__WEBPACK_IMPORTED_MODULE_1__.z)(firstDateOfCalendar),endDate:(0,_utils_generateYYYYMMDDWithoutHyphens__WEBPACK_IMPORTED_MODULE_1__.z)(lastDateOfCalendar)}}},"./src/utils/getDateByPosition.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>getDateByPosition});var _constants_calendar__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/constants/calendar.ts");const ROW_REGEX=/^[0-5]$/,COLUMN_REGEX=/^[0-6]$/,getDateByPosition=(year,month,row,column)=>{throwIfInvalidRowColumn(row,column);const firstDateOfMonth=new Date(year,month,1);return new Date(firstDateOfMonth.getTime()+_constants_calendar__WEBPACK_IMPORTED_MODULE_0__.CZ*(7*row+column-firstDateOfMonth.getDay()))},throwIfInvalidRowColumn=(row,column)=>{if(!ROW_REGEX.test(row.toString())||!COLUMN_REGEX.test(column.toString()))throw Error("잘못된 행 또는 열이 대입되었습니다. 입력 데이터가 아래의 조건을 지키는 지 확인해 주세요:\n- 행은 0 이상 5 이하의 정수여야 합니다.\n- 열은 0 이상 6 이하의 정수여야 합니다.")}},"./src/utils/parseDate.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{_:()=>parseDate});const parseDate=rawDate=>({year:rawDate.getFullYear(),month:rawDate.getMonth(),date:rawDate.getDate(),day:rawDate.getDay()})},"./src/components/team_calendar/TeamCalendar/TeamCalendar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>TeamCalendar_stories});var react=__webpack_require__("./node_modules/react/index.js"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),DateCell=__webpack_require__("./src/components/common/DateCell/DateCell.tsx"),ScheduleModal=__webpack_require__("./src/components/team_calendar/ScheduleModal/ScheduleModal.tsx"),ScheduleBar=__webpack_require__("./src/components/team_calendar/ScheduleBar/ScheduleBar.tsx"),ScheduleAddModal=__webpack_require__("./src/components/team_calendar/ScheduleAddModal/ScheduleAddModal.tsx"),ScheduleEditModal=__webpack_require__("./src/components/team_calendar/ScheduleEditModal/ScheduleEditModal.tsx"),ScheduleMoreCell=__webpack_require__("./src/components/team_calendar/ScheduleMoreCell/ScheduleMoreCell.tsx"),DailyScheduleModal=__webpack_require__("./src/components/team_calendar/DailyScheduleModal/DailyScheduleModal.tsx"),ICalendarModal=__webpack_require__("./src/components/team_calendar/ICalendarModal/ICalendarModal.tsx"),useCalendar=__webpack_require__("./src/hooks/useCalendar.ts"),useModal=__webpack_require__("./src/hooks/useModal.ts");var useQuery=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useQuery.mjs"),schedule=__webpack_require__("./src/apis/schedule.ts"),query=__webpack_require__("./src/constants/query.ts");var useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts");var QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs");const usePrefetchSchedules=async(teamPlaceId,dateRange)=>{const{startDate,endDate}=dateRange,queryClient=(0,QueryClientProvider.jE)();teamPlaceId>0&&await queryClient.prefetchQuery(["schedules",teamPlaceId,startDate,endDate],(()=>(0,schedule.Zn)(teamPlaceId,startDate,endDate)),{staleTime:query.S.SCHEDULES})};var useToast=__webpack_require__("./src/hooks/useToast.ts"),useModifySchedule=__webpack_require__("./src/hooks/queries/useModifySchedule.ts");var constants_calendar=__webpack_require__("./src/constants/calendar.ts"),parseDate=__webpack_require__("./src/utils/parseDate.ts"),generateUuid=__webpack_require__("./src/utils/generateUuid.ts");const generateScheduleBars=(year,month,schedules)=>{const calendarObject=generateCalendarObject(year,month),rawScheduleBars=generateRawScheduleBars(year,month,schedules,calendarObject),leveledScheduleBars=giveLevelToScheduleBars(rawScheduleBars);return sliceScheduleBars(year,month,leveledScheduleBars)},getFirstLastDateOfCalendar=(year,month)=>{const firstDateOfMonth=new Date(year,month),firstDateOfCalendar=new Date(firstDateOfMonth.getTime()-constants_calendar.CZ*firstDateOfMonth.getDay()),lastDateOfCalendar=new Date(firstDateOfCalendar.getTime()+constants_calendar.T4.ROW_SIZE*constants_calendar.T4.COLUMN_SIZE*constants_calendar.CZ-1);return{firstDateOfCalendar,lastDateOfCalendar}},generateCalendarObject=(year,month)=>{const{firstDateOfCalendar}=getFirstLastDateOfCalendar(year,month),calendarObject={};return Array.from({length:constants_calendar.T4.ROW_SIZE*constants_calendar.T4.COLUMN_SIZE},((_,index)=>{const currentDate=new Date(firstDateOfCalendar.getTime()+index*constants_calendar.CZ),formattedDate=formatDate(currentDate),position={row:Math.floor(index/constants_calendar.T4.COLUMN_SIZE),column:index%constants_calendar.T4.COLUMN_SIZE};calendarObject[formattedDate]=position})),calendarObject},formatDate=rawDate=>{const{year,month,date}=(0,parseDate._)(rawDate);return`${year}/${month+1}/${date}`},generateRawScheduleBars=(year,month,schedules,calendarObject)=>{const rawScheduleBars=[];return schedules.forEach((schedule=>{const{startDateTime,endDateTime,id:scheduleId,title}=schedule,{firstDateOfCalendar,lastDateOfCalendar}=getFirstLastDateOfCalendar(year,month),startDate=new Date(Math.max(new Date(startDateTime).getTime(),firstDateOfCalendar.getTime())),endDate=new Date(Math.min(new Date(endDateTime).getTime(),lastDateOfCalendar.getTime()));if(startDate<=endDate){const duration=calcDuration(startDate,endDate),id=(0,generateUuid.b)(),{row,column}=calendarObject[formatDate(startDate)];rawScheduleBars.push({id,scheduleId,schedule,title,row,column,duration,level:0,roundedStart:!1,roundedEnd:!1})}})),rawScheduleBars},calcDuration=(start,end)=>{const startDate=new Date(start.getFullYear(),start.getMonth(),start.getDate()),endDate=new Date(end.getFullYear(),end.getMonth(),end.getDate()),diff=new Date(startDate).getTime()-new Date(endDate).getTime();return Math.abs(diff/constants_calendar.CZ)+1},sliceScheduleBars=(year,month,rawScheduleBars)=>{const slicedScheduleBars=[],{firstDateOfCalendar,lastDateOfCalendar}=getFirstLastDateOfCalendar(year,month);return rawScheduleBars.forEach((scheduleBar=>{const{row,column,duration,schedule}=scheduleBar;let remainingDuration=duration,currentRow=row,currentColumn=column,isFirstSlice=!0;for(;remainingDuration>0&&currentRow<constants_calendar.T4.ROW_SIZE;){const currentDuration=Math.min(remainingDuration,constants_calendar.T4.COLUMN_SIZE-currentColumn);remainingDuration-=currentDuration;const isRoundedStart=isFirstSlice&&new Date(schedule.startDateTime)>=firstDateOfCalendar,isRoundedEnd=0===remainingDuration&&new Date(schedule.endDateTime)<=lastDateOfCalendar;slicedScheduleBars.push({...scheduleBar,row:currentRow,column:currentColumn,duration:currentDuration,roundedStart:isRoundedStart,roundedEnd:isRoundedEnd}),currentRow+=1,currentColumn=0,isFirstSlice=!1}})),slicedScheduleBars},giveLevelToScheduleBars=scheduleBars=>{const leveledScheduleBars=[],lastIndexes=[],sortedScheduleBars=(scheduleBars=>[...scheduleBars].sort(((a,b)=>a.row!==b.row?a.row-b.row:a.column!==b.column?a.column-b.column:b.duration-a.duration)))(scheduleBars);return sortedScheduleBars.forEach((scheduleBar=>{const{row,column,duration}=scheduleBar,level=lastIndexes.findIndex((lastIndex=>lastIndex<row*constants_calendar.T4.COLUMN_SIZE+column));-1===level?(lastIndexes.push(row*constants_calendar.T4.COLUMN_SIZE+column+duration-1),leveledScheduleBars.push({...scheduleBar,level:lastIndexes.length-1})):(lastIndexes[level]=row*constants_calendar.T4.COLUMN_SIZE+column+duration-1,leveledScheduleBars.push({...scheduleBar,level}))})),leveledScheduleBars};var arrayOf=__webpack_require__("./src/utils/arrayOf.ts"),getDateByPosition=__webpack_require__("./src/utils/getDateByPosition.ts"),generateCalendarRangeByYearMonth=__webpack_require__("./src/utils/generateCalendarRangeByYearMonth.ts"),svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.I4.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding: 0 ${({$calendarSize})=>"md"===$calendarSize?10:0}px;
`,CalendarHeader=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,CalendarGrid=styled_components_browser_esm.I4.div`
  position: relative;
`,ButtonContainer=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;
`,FeatureButtonContainer=styled_components_browser_esm.I4.div`
  display: flex;
  align-items: center;

  column-gap: 8px;
`,DaysOfWeek=styled_components_browser_esm.I4.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  height: ${({$calendarSize})=>"md"===$calendarSize?24:20}px;

  border-bottom: 2px solid ${({theme})=>theme.color.GRAY200};
`,DayOfWeek=styled_components_browser_esm.I4.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 16px;

  &:nth-child(1) {
    color: ${({theme})=>theme.color.RED};
  }

  &:nth-child(7) {
    color: ${({theme})=>theme.color.PURPLE};
  }
`,DateView=styled_components_browser_esm.I4.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: ${({$calendarSize})=>"md"===$calendarSize?110:80}px;

  background-color: ${({theme})=>theme.color.WHITE};

  border-left: 2px solid ${({theme})=>theme.color.GRAY200};

  & > div {
    border-right: 2px solid ${({theme})=>theme.color.GRAY200};
    border-bottom: 2px solid ${({theme})=>theme.color.GRAY200};
  }
`,ScheduleBarContainer=styled_components_browser_esm.I4.div`
  position: relative;
`,scheduleAddButton=calendarSize=>styled_components_browser_esm.AH`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${"md"===calendarSize?30:24}px;
  height: ${"md"===calendarSize?30:24}px;
  padding: 4px;

  font-size: 24px;
`,arrowButton=calendarSize=>styled_components_browser_esm.AH`
  ${"sm"===calendarSize&&"padding: 4px 8px"}
`,exportButton=calendarSize=>styled_components_browser_esm.AH`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${"md"===calendarSize?30:24}px;
  height: ${"md"===calendarSize?30:24}px;
  padding: 4px;

  background-color: ${({theme})=>theme.color.GRAY500};
`,CalendarDragScreen_styled_Container=styled_components_browser_esm.I4.div`
  ${({$isDragging})=>!$isDragging&&"display: none"};
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: ${({theme})=>theme.color.WHITE_BLUR};

  cursor: all-scroll;
`;var FakeScheduleBarsScreen=__webpack_require__("./src/components/team_calendar/FakeScheduleBarsScreen/FakeScheduleBarsScreen.tsx");const getCalendarDateDifferenceByMousePoint=(relativeX,relativeY,calendarWidth,calendarHeight)=>{const rowDifference=Math.round(relativeY*constants_calendar.T4.ROW_SIZE/calendarHeight),columnDifference=Math.round(relativeX*constants_calendar.T4.COLUMN_SIZE/calendarWidth);return rowDifference*constants_calendar.T4.COLUMN_SIZE+columnDifference},changeDateTimeByDays=(dateTime,days)=>{const changedDate=new Date(Number(new Date(dateTime))+constants_calendar.CZ*days),year=String(changedDate.getFullYear()).padStart(4,"0"),month=String(changedDate.getMonth()+1).padStart(2,"0"),day=String(changedDate.getDate()).padStart(2,"0"),time=dateTime.split(" ")[1],[minute,second]=time.split(":");return`${year}-${month}-${day} ${minute}:${second}`},useCalendarDragScreen=props=>{const{isDragging,calendarRef,calendarSize,initX,initY,onMouseUp,year,month,level,schedule}=props,[calendarPointInfos,setCalendarPointInfos]=(0,react.useState)({relativeX:0,relativeY:0,calendarWidth:0,calendarHeight:0}),{relativeX,relativeY,calendarWidth,calendarHeight}=calendarPointInfos,scheduleBarsInfo=null===schedule?null:(params=>{const{schedule,year,month,relativeX,relativeY,calendarWidth,calendarHeight,level,calendarSize}=params,difference=getCalendarDateDifferenceByMousePoint(relativeX,relativeY,calendarWidth,calendarHeight),{startDateTime,endDateTime}=schedule,changedStartDateTime=changeDateTimeByDays(startDateTime,difference),changedEndDateTime=changeDateTimeByDays(endDateTime,difference);return{scheduleBars:generateScheduleBars(year,month,[{...schedule,startDateTime:changedStartDateTime,endDateTime:changedEndDateTime}]).map((scheduleBar=>({...scheduleBar,level,calendarSize}))),startDateTime:changedStartDateTime,endDateTime:changedEndDateTime}})({schedule,year,month,relativeX,relativeY,calendarWidth,calendarHeight,level,calendarSize}),handleMouseMove=(0,react.useCallback)((e=>{if(!isDragging)return;const{clientX,clientY}=e;setCalendarPointInfos((prev=>({...prev,relativeX:clientX-initX,relativeY:clientY-initY})))}),[initX,initY,isDragging]),handleMouseUp=(0,react.useCallback)((()=>{if(!isDragging||!scheduleBarsInfo||!schedule)return;const{title}=schedule,{startDateTime,endDateTime}=scheduleBarsInfo,shouldUpdate=schedule.startDateTime!==startDateTime;onMouseUp(title,startDateTime,endDateTime,shouldUpdate),setCalendarPointInfos((prev=>({...prev,relativeX:0,relativeY:0})))}),[onMouseUp,schedule,scheduleBarsInfo,isDragging]);(0,react.useEffect)((()=>{const calendarElement=calendarRef.current;if(!calendarElement)return;const resizeObserver=new ResizeObserver((()=>{const{clientWidth,clientHeight}=calendarElement;setCalendarPointInfos((prev=>({...prev,calendarWidth:clientWidth,calendarHeight:clientHeight})))}));return calendarElement.addEventListener("mousemove",handleMouseMove),document.addEventListener("mouseup",handleMouseUp),resizeObserver.observe(calendarElement),()=>{calendarElement.removeEventListener("mousemove",handleMouseMove),document.removeEventListener("mouseup",handleMouseUp),resizeObserver.disconnect()}}),[calendarRef,handleMouseMove,handleMouseUp]);const processedRelativePoint={x:(relativeX+calendarWidth*(15/14))%(calendarWidth/7)-calendarWidth/14,y:(relativeY+calendarHeight*(13/12))%(calendarHeight/6)-calendarHeight/12};return{scheduleBars:scheduleBarsInfo?scheduleBarsInfo.scheduleBars:[],relativeX:processedRelativePoint.x,relativeY:processedRelativePoint.y}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const CalendarDragScreen=props=>{const{calendarSize,year,month,dragStatus,onMouseUp}=props,{isDragging,level,schedule,initX,initY}=dragStatus,calendarRef=(0,react.useRef)(null),{scheduleBars,relativeX,relativeY}=useCalendarDragScreen({isDragging,initX,initY,calendarRef,calendarSize,onMouseUp,year,month,level,schedule});return(0,jsx_runtime.jsxs)(CalendarDragScreen_styled_Container,{$isDragging:isDragging,ref:calendarRef,children:[(0,jsx_runtime.jsx)(FakeScheduleBarsScreen.A,{mode:"indicator",scheduleBars}),(0,jsx_runtime.jsx)(FakeScheduleBarsScreen.A,{mode:"schedule",scheduleBars,relativeX,relativeY})]})};CalendarDragScreen.displayName="CalendarDragScreen";const CalendarDragScreen_CalendarDragScreen=CalendarDragScreen;try{CalendarDragScreen.displayName="CalendarDragScreen",CalendarDragScreen.__docgenInfo={description:"",displayName:"CalendarDragScreen",props:{calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!0,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},year:{defaultValue:null,description:"",name:"year",required:!0,type:{name:"number"}},month:{defaultValue:null,description:"",name:"month",required:!0,type:{name:"number"}},dragStatus:{defaultValue:null,description:"",name:"dragStatus",required:!0,type:{name:"DragStatus"}},onMouseUp:{defaultValue:null,description:"",name:"onMouseUp",required:!0,type:{name:"(title: string, startDateTime: `${string}-${string}-${string} ${string}:${string}`, endDateTime: `${string}-${string}-${string} ${string}:${string}`, shouldUpdate: boolean) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/CalendarDragScreen/CalendarDragScreen.tsx#CalendarDragScreen"]={docgenInfo:CalendarDragScreen.__docgenInfo,name:"CalendarDragScreen",path:"src/components/team_calendar/CalendarDragScreen/CalendarDragScreen.tsx#CalendarDragScreen"})}catch(__react_docgen_typescript_loader_error){}var Spacing=__webpack_require__("./src/components/common/Spacing/Spacing.tsx");const TeamCalendar=props=>{const{calendarSize="md"}=props,{dragStatus,handleDragStart,handleMouseUp}=(()=>{const[dragStatus,setDragStatus]=(0,react.useState)({isDragging:!1,level:0,schedule:null,initX:0,initY:0}),{showToast}=(0,useToast.d)(),{teamPlaceId}=(0,useTeamPlace.Y)(),scheduleId=null===dragStatus.schedule?0:dragStatus.schedule.id,{mutateModifySchedule}=(0,useModifySchedule.d)(teamPlaceId,scheduleId);return{dragStatus,handleDragStart:(e,level,schedule)=>{const{clientX,clientY}=e;setDragStatus((()=>({isDragging:!0,schedule,level,initX:clientX,initY:clientY})))},handleMouseUp:(title,startDateTime,endDateTime,shouldUpdate)=>{dragStatus.isDragging&&(setDragStatus((prev=>({...prev,isDragging:!1}))),shouldUpdate&&mutateModifySchedule({title,startDateTime,endDateTime},{onSuccess:()=>{showToast("success","일정이 수정되었습니다."),setDragStatus((prev=>({...prev,schedule:null})))},onError:error=>{500===error.status&&showToast("error","일정 제목이 최대 글자(250자)를 초과했습니다.")}}))}}})(),{teamPlaceId}=(0,useTeamPlace.Y)(),{year,month,calendar,currentDate,today,handlers:{handlePrevButtonClick,handleNextButtonClick}}=(0,useCalendar._)(),{isModalOpen,openModal}=(0,useModal.h)(),{modalScheduleId,modalPosition,handlers:{handleScheduleModalOpen}}=(()=>{const[modalScheduleId,setModalScheduleId]=(0,react.useState)(0),[modalPosition,setModalPosition]=(0,react.useState)({row:0,column:0,level:0}),{openModal}=(0,useModal.h)();return{modalPosition,modalScheduleId,handlers:{handleScheduleModalOpen:({scheduleId,row,column,level})=>{setModalScheduleId((()=>scheduleId)),setModalPosition((()=>({row,column,level}))),openModal()}}}})(),prevCalendarYear=0===month?year-1:year,prevCalendarMonth=0===month?11:month-1,nextCalendarYear=11===month?year+1:year,nextCalendarMonth=11===month?0:month+1,schedules=((teamPlaceId,dateRange)=>{const{startDate,endDate}=dateRange,{data}=(0,useQuery.I)(["schedules",teamPlaceId,startDate,endDate],(()=>(0,schedule.Zn)(teamPlaceId,startDate,endDate)),{enabled:teamPlaceId>0,staleTime:query.S.SCHEDULES});if(void 0===data)return[];const{schedules}=data;return schedules})(teamPlaceId,(0,generateCalendarRangeByYearMonth.Z)(year,month));usePrefetchSchedules(teamPlaceId,(0,generateCalendarRangeByYearMonth.Z)(prevCalendarYear,prevCalendarMonth)),usePrefetchSchedules(teamPlaceId,(0,generateCalendarRangeByYearMonth.Z)(nextCalendarYear,nextCalendarMonth));const[clickedDate,setClickedDate]=(0,react.useState)(currentDate),[modalType,setModalType]=(0,react.useState)(constants_calendar.kT.ADD),[dailyModalDate,setDailyModalDate]=(0,react.useState)(new Date),[dailyModalPosition,setDailyModalPosition]=(0,react.useState)({row:0,column:0}),calendarRef=(0,react.useRef)(null),{width,left}=(targetRef=>{const[width,setWidth]=(0,react.useState)(0),[left,setLeft]=(0,react.useState)(0),updateWidthLeft=(0,react.useCallback)((()=>{const targetElement=targetRef.current;if(targetElement){const{width,left}=targetElement.getBoundingClientRect();setWidth((()=>width)),setLeft((()=>left))}}),[targetRef]);return(0,react.useEffect)((()=>(window.addEventListener("resize",updateWidthLeft),updateWidthLeft(),()=>{window.removeEventListener("resize",updateWidthLeft)})),[targetRef,updateWidthLeft]),{width,left}})(calendarRef),scheduleBars=generateScheduleBars(year,month,schedules),handleModalOpen=modalOpenType=>{setModalType((()=>modalOpenType)),openModal()},handleDailyScheduleModalOpen=(day,row,col)=>{setModalType((()=>constants_calendar.kT.DAILY)),setDailyModalDate((()=>day)),setDailyModalPosition({row,column:col}),openModal()},modal=isModalOpen?(modalOpenType=modalType)===constants_calendar.kT.ADD?(0,jsx_runtime.jsx)(ScheduleAddModal.A,{calendarSize,clickedDate}):modalOpenType===constants_calendar.kT.VIEW?(0,jsx_runtime.jsx)(ScheduleModal.A,{calendarWidth:width,calendarLeft:left,calendarSize,scheduleId:modalScheduleId,position:modalPosition,onOpenScheduleEditModal:()=>handleModalOpen(constants_calendar.kT.EDIT)}):modalOpenType===constants_calendar.kT.EDIT?(0,jsx_runtime.jsx)(ScheduleEditModal.A,{calendarSize,scheduleId:modalScheduleId,initialSchedule:schedules.find((schedule=>schedule.id===modalScheduleId))}):modalOpenType===constants_calendar.kT.DAILY?(0,jsx_runtime.jsx)(DailyScheduleModal.A,{calendarWidth:width,calendarLeft:left,calendarSize,rawDate:dailyModalDate,position:dailyModalPosition,onScheduleModalOpen:handleScheduleModalOpen,onSetModalType:()=>setModalType((()=>constants_calendar.kT.VIEW))}):modalOpenType===constants_calendar.kT.EXPORT?(0,jsx_runtime.jsx)(ICalendarModal.A,{calendarSize}):null:null;var modalOpenType,size;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsxs)(Container,{$calendarSize:calendarSize,children:[(0,jsx_runtime.jsxs)(CalendarHeader,{children:[(0,jsx_runtime.jsx)(Spacing.A,{direction:"horizontal",size:56}),(0,jsx_runtime.jsxs)(ButtonContainer,{children:[(0,jsx_runtime.jsx)(Button.A,{variant:"plain",onClick:handlePrevButtonClick,"aria-label":"이전 달로 이동하기",css:arrowButton(calendarSize),children:(0,jsx_runtime.jsx)(svg.A6,{})}),(0,jsx_runtime.jsx)("time",{children:(0,jsx_runtime.jsxs)(Text.A,{weight:"semiBold",css:(size=calendarSize,styled_components_browser_esm.AH`
  font-size: ${"md"===size?24:18}px;
`),children:[year,"년 ",month+1,"월"]})}),(0,jsx_runtime.jsx)(Button.A,{variant:"plain",onClick:handleNextButtonClick,css:arrowButton(calendarSize),"aria-label":"다음 달로 이동하기",children:(0,jsx_runtime.jsx)(svg.fl,{})})]}),(0,jsx_runtime.jsxs)(FeatureButtonContainer,{children:[(0,jsx_runtime.jsx)(Button.A,{css:exportButton(calendarSize),onClick:()=>{handleModalOpen(constants_calendar.kT.EXPORT)},"aria-label":"일정 내보내기",children:(0,jsx_runtime.jsx)(svg.GP,{})}),(0,jsx_runtime.jsx)(Button.A,{css:scheduleAddButton(calendarSize),onClick:()=>{setClickedDate((()=>currentDate)),handleModalOpen(constants_calendar.kT.ADD)},"aria-label":"새로운 일정 등록하기",children:(0,jsx_runtime.jsx)(svg.c1,{})})]})]}),(0,jsx_runtime.jsxs)("div",{ref:calendarRef,children:[(0,jsx_runtime.jsx)(DaysOfWeek,{$calendarSize:calendarSize,children:constants_calendar.j_.map((day=>(0,jsx_runtime.jsx)(DayOfWeek,{children:day},day)))}),(0,jsx_runtime.jsxs)(CalendarGrid,{children:[calendar.map(((week,rowIndex)=>(0,jsx_runtime.jsxs)(react.Fragment,{children:[(0,jsx_runtime.jsx)(ScheduleBarContainer,{children:scheduleBars.map((scheduleBar=>{const{id,scheduleId,row,column,level,duration,schedule}=scheduleBar;return row===rowIndex&&level>2?(0,arrayOf.j)(duration).map(((_,index)=>{const date=(0,getDateByPosition.L)(year,month,row,column+index);return(0,jsx_runtime.jsx)(ScheduleMoreCell.A,{calendarSize,column:column+index,onClick:()=>handleDailyScheduleModalOpen(date,row,column+index)},id+index)})):row===rowIndex?(0,jsx_runtime.jsx)(ScheduleBar.A,{calendarSize,onClick:()=>{setModalType((()=>constants_calendar.kT.VIEW)),handleScheduleModalOpen({scheduleId,row,column,level})},onDragStart:e=>handleDragStart(e,level,schedule),...scheduleBar},id):null}))}),(0,jsx_runtime.jsx)(DateView,{$calendarSize:calendarSize,children:week.map(((day,colIndex)=>{const{year:renderYear,month:renderMonth,date:renderDate}=(0,parseDate._)(day),isToday=today.year===renderYear&&today.month===renderMonth&&today.date===renderDate;return(0,jsx_runtime.jsx)(DateCell.A,{rawDate:day,currentMonth:month,isToday,onClick:()=>{(clickedDate=>{setClickedDate((()=>clickedDate)),handleModalOpen(constants_calendar.kT.ADD)})(day)},onDayClick:e=>{e.stopPropagation(),handleDailyScheduleModalOpen(day,rowIndex,colIndex)}},day.toISOString())}))})]},rowIndex))),(0,jsx_runtime.jsx)(CalendarDragScreen_CalendarDragScreen,{calendarSize,year,month,dragStatus,onMouseUp:handleMouseUp})]})]})]}),modal]})},TeamCalendar_TeamCalendar=TeamCalendar;try{TeamCalendar.displayName="TeamCalendar",TeamCalendar.__docgenInfo={description:"",displayName:"TeamCalendar",props:{calendarSize:{defaultValue:null,description:"",name:"calendarSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/TeamCalendar/TeamCalendar.tsx#TeamCalendar"]={docgenInfo:TeamCalendar.__docgenInfo,name:"TeamCalendar",path:"src/components/team_calendar/TeamCalendar/TeamCalendar.tsx#TeamCalendar"})}catch(__react_docgen_typescript_loader_error){}const TeamCalendar_stories={title:"Calendar/TeamCalendar",component:TeamCalendar_TeamCalendar,tags:["autodocs"]},Default={args:{}},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...Default.parameters?.docs?.source}}}}}]);
//# sourceMappingURL=components-team_calendar-TeamCalendar-TeamCalendar-stories.3547a43e.iframe.bundle.js.map