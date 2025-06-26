"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[65],{"./node_modules/@tanstack/react-query/build/lib/useMutation.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>useMutation});var react=__webpack_require__("./node_modules/react/index.js"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),mutation=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/mutation.mjs"),notifyManager=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs"),subscribable=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");class MutationObserver extends subscribable.Q{constructor(client,options){super(),this.client=client,this.setOptions(options),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(options){var _this$currentMutation;const prevOptions=this.options;this.options=this.client.defaultMutationOptions(options),(0,utils.f8)(prevOptions,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(_this$currentMutation=this.currentMutation)||_this$currentMutation.setOptions(this.options)}onUnsubscribe(){var _this$currentMutation2;this.hasListeners()||(null==(_this$currentMutation2=this.currentMutation)||_this$currentMutation2.removeObserver(this))}onMutationUpdate(action){this.updateResult();const notifyOptions={listeners:!0};"success"===action.type?notifyOptions.onSuccess=!0:"error"===action.type&&(notifyOptions.onError=!0),this.notify(notifyOptions)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(variables,options){return this.mutateOptions=options,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==variables?variables:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const state=this.currentMutation?this.currentMutation.state:(0,mutation.$)(),result={...state,isLoading:"loading"===state.status,isSuccess:"success"===state.status,isError:"error"===state.status,isIdle:"idle"===state.status,mutate:this.mutate,reset:this.reset};this.currentResult=result}notify(options){notifyManager.j.batch((()=>{var _this$mutateOptions$o,_this$mutateOptions,_this$mutateOptions$o2,_this$mutateOptions2;if(this.mutateOptions&&this.hasListeners())if(options.onSuccess)null==(_this$mutateOptions$o=(_this$mutateOptions=this.mutateOptions).onSuccess)||_this$mutateOptions$o.call(_this$mutateOptions,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o2=(_this$mutateOptions2=this.mutateOptions).onSettled)||_this$mutateOptions$o2.call(_this$mutateOptions2,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context);else if(options.onError){var _this$mutateOptions$o3,_this$mutateOptions3,_this$mutateOptions$o4,_this$mutateOptions4;null==(_this$mutateOptions$o3=(_this$mutateOptions3=this.mutateOptions).onError)||_this$mutateOptions$o3.call(_this$mutateOptions3,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o4=(_this$mutateOptions4=this.mutateOptions).onSettled)||_this$mutateOptions$o4.call(_this$mutateOptions4,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}options.listeners&&this.listeners.forEach((({listener})=>{listener(this.currentResult)}))}))}}var useSyncExternalStore=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),lib_utils=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/utils.mjs");function useMutation(arg1,arg2,arg3){const options=(0,utils.GR)(arg1,arg2,arg3),queryClient=(0,QueryClientProvider.jE)({context:options.context}),[observer]=react.useState((()=>new MutationObserver(queryClient,options)));react.useEffect((()=>{observer.setOptions(options)}),[observer,options]);const result=(0,useSyncExternalStore.r)(react.useCallback((onStoreChange=>observer.subscribe(notifyManager.j.batchCalls(onStoreChange))),[observer]),(()=>observer.getCurrentResult()),(()=>observer.getCurrentResult())),mutate=react.useCallback(((variables,mutateOptions)=>{observer.mutate(variables,mutateOptions).catch(noop)}),[observer]);if(result.error&&(0,lib_utils.G)(observer.options.useErrorBoundary,[result.error]))throw result.error;return{...result,mutate,mutateAsync:result.mutate}}function noop(){}},"./src/apis/schedule.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{F_:()=>fetchICalendarUrl,VD:()=>deleteSchedule,Xd:()=>fetchMySchedules,Zn:()=>fetchSchedules,eF:()=>modifySchedule,iR:()=>sendSchedule,o6:()=>fetchScheduleById});var _apis_http__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/http.ts");const fetchSchedules=(teamPlaceId,startDate,endDate)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.L.get(`/api/team-place/${teamPlaceId}/calendar/schedules?startDate=${startDate}&endDate=${endDate}`),fetchMySchedules=(startDate,endDate)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.L.get(`/api/my-calendar/schedules?startDate=${startDate}&endDate=${endDate}`),fetchScheduleById=(teamPlaceId,scheduleId)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.L.get(`/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`),fetchICalendarUrl=teamPlaceId=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.L.get(`/api/team-place/${teamPlaceId}/icalendar-url`),deleteSchedule=(teamPlaceId,scheduleId)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.L.delete(`/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`),sendSchedule=(teamPlaceId,body)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.L.post(`/api/team-place/${teamPlaceId}/calendar/schedules`,body),modifySchedule=(teamPlaceId,scheduleId,body)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.L.patch(`/api/team-place/${teamPlaceId}/calendar/schedules/${scheduleId}`,body)},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.AH`
    background-color: ${({theme})=>theme.color.PRIMARY};
    color: ${({theme})=>theme.color.WHITE};
  `,normal:styled_components_browser_esm.AH`
    background-color: ${({theme})=>theme.color.WHITE};
    color: ${({theme})=>theme.color.GRAY900};
    border: 1px solid ${({theme})=>theme.color.GRAY300};
  `,plain:styled_components_browser_esm.AH`
    background-color: transparent;
    color: ${({theme})=>theme.color.GRAY900};
  `},ButtonWrapper=styled_components_browser_esm.I4.button.withConfig({shouldForwardProp:prop=>!["css","variant","size"].includes(prop)})`
  font-size: 16px;
  line-height: 16px;
  text-align: center;

  ${({size="md"})=>styled_components_browser_esm.AH`
      padding: ${paddingSize[size]};
    `};

  ${({variant="primary"})=>variants[variant]};

  ${({variant="primary"})=>{if("plain"!==variant)return styled_components_browser_esm.AH`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})},Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Input/Input.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Input_Input});const InputWrapper=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").I4.input.withConfig({shouldForwardProp:prop=>!["width","height","css"].includes(prop)})`
  width: ${({width})=>width};
  height: ${({height})=>height};
  padding: 6px;

  border: 1px solid ${({theme})=>theme.color.GRAY200};

  font-size: 14px;

  && {
    ${props=>props.css}
  }
`;var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Input=(0,react.forwardRef)(((props,ref)=>{const{width,height,css,...rest}=props;return(0,jsx_runtime.jsx)(InputWrapper,{width,height,css,ref,...rest})}));Input.displayName="Input";const Input_Input=Input;try{Input.displayName="Input",Input.__docgenInfo={description:"",displayName:"Input",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"string"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Input/Input.tsx#Input"]={docgenInfo:Input.__docgenInfo,name:"Input",path:"src/components/common/Input/Input.tsx#Input"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Menu/Menu.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Menu_Menu});var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const MenuContext=(0,react.createContext)({}),MenuProvider=props=>{const{children}=props,[isMenuOpen,setIsMenuOpen]=(0,react.useState)(!1),[selectedValue,setSelectedValue]=(0,react.useState)(""),value={isMenuOpen,selectedValue,handleMenuOpen:()=>{setIsMenuOpen((prev=>!prev))},handleSelectedValueChange:value=>{setSelectedValue((()=>value))}};return(0,jsx_runtime.jsx)(MenuContext.Provider,{value,children})};try{MenuProvider.displayName="MenuProvider",MenuProvider.__docgenInfo={description:"",displayName:"MenuProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/MenuContext.tsx#MenuProvider"]={docgenInfo:MenuProvider.__docgenInfo,name:"MenuProvider",path:"src/components/common/Menu/MenuContext.tsx#MenuProvider"})}catch(__react_docgen_typescript_loader_error){}var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx");const useMenu=()=>{const context=(0,react.useContext)(MenuContext);if(void 0===context)throw new Error("useMenu must be used within a MenuProvider");return context},OPEN_TRIGGER_KEYS=["ArrowUp","ArrowDown"],MenuButton=props=>{const{children,value="",...rest}=props,{isMenuOpen,handleMenuOpen,handleSelectedValueChange}=useMenu();return(0,react.useEffect)((()=>{""!==value&&handleSelectedValueChange(value)}),[value,handleSelectedValueChange]),(0,jsx_runtime.jsx)(Button.A,{type:"button",variant:"plain","aria-haspopup":"true","aria-expanded":isMenuOpen,onClick:handleMenuOpen,onKeyDown:e=>{OPEN_TRIGGER_KEYS.includes(e.key)&&(e.preventDefault(),isMenuOpen||handleMenuOpen())},...rest,children:children||(0,jsx_runtime.jsx)(Text.A,{as:"span",children:value})})},MenuButton_MenuButton=MenuButton;try{MenuButton.displayName="MenuButton",MenuButton.__docgenInfo={description:"",displayName:"MenuButton",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/MenuButton/MenuButton.tsx#MenuButton"]={docgenInfo:MenuButton.__docgenInfo,name:"MenuButton",path:"src/components/common/Menu/MenuButton/MenuButton.tsx#MenuButton"})}catch(__react_docgen_typescript_loader_error){}var useClickOutside=__webpack_require__("./src/hooks/useClickOutside.ts");const TRIGGER_KEYS=["ArrowDown","ArrowUp","Enter","Escape"];var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.I4.ul.withConfig({shouldForwardProp:prop=>!["width"].includes(prop)})`
  position: absolute;
  z-index: ${({theme})=>theme.zIndex.MENU};

  max-height: 200px;
  width: ${({width})=>width};
  overflow-y: auto;

  background-color: ${({theme})=>theme.color.WHITE};

  border: 1px solid ${({theme})=>theme.color.GRAY200};
  border-radius: 6px;
`,MenuList=props=>{const{children,onSelect,width="100%"}=props,{isMenuOpen,selectedValue,handleMenuOpen,handleSelectedValueChange}=useMenu(),ref=(0,react.useRef)(null);(0,useClickOutside.L)(ref,(e=>{const{target}=e;target instanceof HTMLButtonElement||target.closest("button")||handleMenuOpen()}));const selectItem=value=>{onSelect?.(value),handleSelectedValueChange(value),handleMenuOpen()},{handlers:{handleMouseEnter,handleMouseLeave,handleKeyDown}}=((ref,onClose,onSelect)=>{const isMouseOver=(0,react.useRef)(!1),getHoveredChildIndex=children=>{const hoveredChild=ref.current?.querySelector(":hover");return children.findIndex((child=>child===hoveredChild))},focusPrevChild=(children,selectedChildIndex)=>{if(0===selectedChildIndex)return;const currentChild=children[selectedChildIndex],prevChild=children[selectedChildIndex-1];currentChild.classList.remove("selected"),focusChild(prevChild)},focusNextChild=(children,selectedChildIndex)=>{if(selectedChildIndex===children.length-1)return;const currentChild=children[selectedChildIndex],nextChild=children[selectedChildIndex+1];currentChild.classList.remove("selected"),focusChild(nextChild)},focusChild=child=>{child.classList.add("selected"),scrollToChild(child)},scrollToChild=child=>{if(!(child instanceof HTMLLIElement))return;const{offsetTop}=child;ref.current?.scrollTo(0,offsetTop)};return{handlers:{handleMouseEnter:()=>{isMouseOver.current=!0;const children=Array.from(ref.current?.children??[]),selectedChildIndex=children.findIndex((child=>child.classList.contains("selected")));-1!==selectedChildIndex&&children[selectedChildIndex].classList.remove("selected")},handleMouseLeave:()=>{isMouseOver.current=!1},handleKeyDown:e=>{if(!TRIGGER_KEYS.includes(e.key))return;if(e.preventDefault(),"Escape"===e.key)return void onClose();const children=Array.from(ref.current?.children??[]),selectedChildIndex=children.findIndex((child=>child.classList.contains("selected")));if("ArrowUp"===e.key)return-1===selectedChildIndex?void(isMouseOver.current?focusPrevChild(children,getHoveredChildIndex(children)):focusChild(children[children.length-1])):void focusPrevChild(children,selectedChildIndex);if("ArrowDown"===e.key)return-1===selectedChildIndex?void(isMouseOver.current?focusNextChild(children,getHoveredChildIndex(children)):focusChild(children[0])):void focusNextChild(children,selectedChildIndex);if("Enter"===e.key){if(-1===selectedChildIndex)return;const selectedChild=children[selectedChildIndex],{textContent}=selectedChild;if(!textContent)return;onSelect(textContent)}}}}})(ref,handleMenuOpen,selectItem);return(0,react.useEffect)((()=>{isMenuOpen&&ref.current&&ref.current.focus()}),[isMenuOpen]),(0,react.useEffect)((()=>{if(""===selectedValue||!isMenuOpen)return;if(!ref.current)return;const target=Array.from(ref.current.children).find((child=>child.textContent?.replace("✓","")===selectedValue));if(!(target instanceof HTMLLIElement))return;const{offsetTop}=target;ref.current.scrollTo(0,offsetTop)}),[isMenuOpen,selectedValue]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:isMenuOpen&&(0,jsx_runtime.jsx)(Wrapper,{role:"menu",ref,width,onClick:e=>{const{target}=e;if(!(target instanceof HTMLLIElement))return;const{textContent}=target;textContent&&selectItem(textContent)},onMouseEnter:handleMouseEnter,onMouseLeave:handleMouseLeave,onKeyDown:handleKeyDown,tabIndex:0,children})})},MenuList_MenuList=MenuList;try{MenuList.displayName="MenuList",MenuList.__docgenInfo={description:"",displayName:"MenuList",props:{width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"string"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!1,type:{name:"((value: string) => void)"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/MenuList/MenuList.tsx#MenuList"]={docgenInfo:MenuList.__docgenInfo,name:"MenuList",path:"src/components/common/Menu/MenuList/MenuList.tsx#MenuList"})}catch(__react_docgen_typescript_loader_error){}const MenuItem_styled_Wrapper=styled_components_browser_esm.I4.li`
  position: relative;

  padding: 8px 26px;

  cursor: pointer;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;

  &:hover {
    background-color: ${({theme})=>theme.color.GRAY100};
  }

  &.selected {
    background-color: ${({theme})=>theme.color.GRAY200};
  }

  ${({css})=>css}
`,checkMark=styled_components_browser_esm.AH`
  position: absolute;
  left: 10px;
`,MenuItem=props=>{const{children,value,css}=props,{selectedValue}=useMenu(),isSelected=selectedValue===value;return(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsxs)(MenuItem_styled_Wrapper,{role:"menuitem",css,className:isSelected?"selected":"",children:[isSelected&&(0,jsx_runtime.jsx)(Text.A,{as:"span",css:checkMark,children:"✓"}),children]})})},MenuItem_MenuItem=MenuItem;try{MenuItem.displayName="MenuItem",MenuItem.__docgenInfo={description:"",displayName:"MenuItem",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/MenuItem/MenuItem.tsx#MenuItem"]={docgenInfo:MenuItem.__docgenInfo,name:"MenuItem",path:"src/components/common/Menu/MenuItem/MenuItem.tsx#MenuItem"})}catch(__react_docgen_typescript_loader_error){}const Menu_styled_Wrapper=styled_components_browser_esm.I4.div`
  position: relative;
`,Menu=props=>{const{children}=props;return(0,jsx_runtime.jsx)(MenuProvider,{children:(0,jsx_runtime.jsx)(Menu_styled_Wrapper,{children})})};Menu.Button=MenuButton_MenuButton,Menu.List=MenuList_MenuList,Menu.Item=MenuItem_MenuItem;const Menu_Menu=Menu;try{Menu.displayName="Menu",Menu.__docgenInfo={description:"",displayName:"Menu",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Menu/Menu.tsx#Menu"]={docgenInfo:Menu.__docgenInfo,name:"Menu",path:"src/components/common/Menu/Menu.tsx#Menu"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Modal/Modal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Modal_Modal});var react_dom=__webpack_require__("./node_modules/react-dom/index.js"),useModal=__webpack_require__("./src/hooks/useModal.ts"),react=__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Modal=props=>{const{children}=props,{isModalOpen,closeModal}=(0,useModal.h)();var triggerKey,callback;return triggerKey="Escape",callback=closeModal,(0,react.useEffect)((()=>{const handleKeydown=e=>{e.key===triggerKey&&callback()};return document.addEventListener("keydown",handleKeydown),()=>{document.removeEventListener("keydown",handleKeydown)}}),[callback,triggerKey]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:isModalOpen&&(0,react_dom.createPortal)((0,jsx_runtime.jsx)("div",{role:"dialog","aria-modal":!0,children}),document.body)})},Modal_Modal=Modal;try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/Modal.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/Modal.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Svg/Svg.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Svg_Svg});var svg=__webpack_require__("./src/assets/svg/index.ts");const Container=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").Ay.svg`
  path {
    fill: ${({$fill})=>$fill||"currentColor"};
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Svg=({type,fill,stroke,style,size,...rest})=>{const SvgIcon=svg[type],svgProps={style,...size?{width:String(size),height:String(size)}:{},...stroke?{stroke}:{}};return(0,jsx_runtime.jsx)(Container,{$fill:fill,as:SvgIcon,...svgProps,...rest})},Svg_Svg=Svg;try{Svg.displayName="Svg",Svg.__docgenInfo={description:"",displayName:"Svg",props:{type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"enum",value:[{value:'"ArrowLeftIcon"'},{value:'"ArrowRightIcon"'},{value:'"CloseIcon"'},{value:'"CloseBoldIcon"'},{value:'"DeleteIcon"'},{value:'"EditIcon"'},{value:'"LogoIcon"'},{value:'"PlusIcon"'},{value:'"CheckIcon"'},{value:'"ClockIcon"'},{value:'"ArrowExpandMoreIcon"'},{value:'"ArrowExpandLessIcon"'},{value:'"MegaphoneIcon"'},{value:'"HomeIcon"'},{value:'"CalendarIcon"'},{value:'"FeedIcon"'},{value:'"DoubleArrowRightIcon"'},{value:'"DriveIcon"'},{value:'"WriteIcon"'},{value:'"ArrowUpIcon"'},{value:'"FolderOpenIcon"'},{value:'"ExitIcon"'},{value:'"LogoutIcon"'},{value:'"TeamIcon"'},{value:'"TeamAddIcon"'},{value:'"ChainIcon"'},{value:'"ClipboardIcon"'},{value:'"ArrowLeft2Icon"'},{value:'"CheckBlackIcon"'},{value:'"AirplaneIcon"'},{value:'"ImageIcon"'},{value:'"WarningIcon"'},{value:'"QuestionIcon"'},{value:'"ExportIcon"'},{value:'"TeamSmallIcon"'},{value:'"EnterIcon"'},{value:'"MemoIcon"'}]}},fill:{defaultValue:null,description:"",name:"fill",required:!1,type:{name:"string"}},stroke:{defaultValue:null,description:"",name:"stroke",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"string | number"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"string"}},height:{defaultValue:null,description:"",name:"height",required:!1,type:{name:"string"}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Svg/Svg.tsx#Svg"]={docgenInfo:Svg.__docgenInfo,name:"Svg",path:"src/components/common/Svg/Svg.tsx#Svg"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Switch/Switch.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Switch_Switch});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),theme=__webpack_require__("./src/styles/theme.ts");const backgroundColor=($isOn,$offColor,$onColor)=>styled_components_browser_esm.AH`
  background-color: ${$isOn?$onColor||theme.A.color.BLACK:$offColor||theme.A.color.GRAY200};
`,flexStyles={column:styled_components_browser_esm.AH`
    flex-direction: column;
  `,row:styled_components_browser_esm.AH`
    flex-direction: row;
  `},sizeStyles={xs:styled_components_browser_esm.AH`
    min-width: 28px;
    height: 16px;
  `,sm:styled_components_browser_esm.AH`
    min-width: 38px;
    height: 20px;
  `,md:styled_components_browser_esm.AH`
    min-width: 48px;
    height: 24px;
  `,lg:styled_components_browser_esm.AH`
    min-width: 58px;
    height: 30px;
  `},thumbSizes={xs:styled_components_browser_esm.AH`
    font-size: 4px;
    width: 12px;
    height: 12px;
  `,sm:styled_components_browser_esm.AH`
    font-size: 6px;
    width: 16px;
    height: 16px;
  `,md:styled_components_browser_esm.AH`
    font-size: 8px;
    width: 20px;
    height: 20px;
  `,lg:styled_components_browser_esm.AH`
    font-size: 10px;
    width: 25px;
    height: 25px;
  `},ContainerDiv=styled_components_browser_esm.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  ${({$descriptionPosition})=>["top","bottom"].includes($descriptionPosition)?flexStyles.column:flexStyles.row}
`,Label=styled_components_browser_esm.Ay.label`
  width: auto;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({$size})=>sizeStyles[$size]}
`,TrackDiv=styled_components_browser_esm.Ay.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  transition: background 0.4s;
  background-color: ${({$offColor})=>$offColor||theme.A.color.GRAY200};

  ${({$variant})=>"solid"===$variant?styled_components_browser_esm.AH`
        height: 100%;
      `:styled_components_browser_esm.AH`
      height: 40%;
    `}

  ${({$isOn,$offColor,$onColor})=>backgroundColor($isOn,$offColor,$onColor)};
`,LabelSpan=styled_components_browser_esm.Ay.span`
  font-size: 14px;
  white-space: nowrap;
  color: ${({$isOn,$onColor,$offColor})=>$isOn?$onColor||theme.A.color.WHITE:$offColor||theme.A.color.GRAY700};
  flex-grow: 1;
  text-align: center;

  ${({$size})=>"sm"===$size?styled_components_browser_esm.AH`
        font-size: 12px;
      `:"xs"===$size?styled_components_browser_esm.AH`
        font-size: 8px;
      `:void 0}

  ${({$isOn})=>$isOn?styled_components_browser_esm.AH`
        margin-left: 10px;
      `:styled_components_browser_esm.AH`
      margin-right: 10px;
    `}


  ${({$size,$isOn})=>styled_components_browser_esm.AH`
      margin-${$isOn?"right":"left"}: calc(${"xs"===$size?"18px":"sm"===$size?"23px":"md"===$size?"28px":"34px"});
    `};
`,ThumbSpan=styled_components_browser_esm.Ay.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  ${({$isOn,$offColor,$onColor})=>backgroundColor($isOn,$offColor??theme.A.color.WHITE,$onColor??theme.A.color.WHITE)};

  ${({$size})=>thumbSizes[$size]};

  ${({$size,$isOn,$variant})=>{const solidLeftPositions={xs:"calc(100% - 14px)",sm:"calc(100% - 19px)",md:"calc(100% - 23px)",lg:"calc(100% - 29px)"};return"solid"===$variant?styled_components_browser_esm.AH`
        left: ${$isOn?solidLeftPositions[$size]:"xs"===$size?"2px":"3px"};
        transition: left 0.4s;
      `:styled_components_browser_esm.AH`
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      left: 0;
      transition: transform 0.4s;
      ${$isOn&&"transform: translateX(142%);"}
    `}}
`,ToggleInput=styled_components_browser_esm.Ay.input.attrs({type:"checkbox"})`
  display: none;

  &:disabled + ${TrackDiv},&:disabled + ${ThumbSpan} {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Switch=({checked,onChange,size="md",variant="solid",style,description,descriptionPosition="right",onLabel,offLabel,onThumb,offThumb,readonly=!1,disabled=!1,onColor,offColor,onLabelColor,offLabelColor,thumbOnColor,thumbOffColor})=>{const[isOn,setIsOn]=(0,react.useState)(checked);(0,react.useRef)(null);return(0,react.useEffect)((()=>{checked!==isOn&&setIsOn(checked)}),[checked,isOn]),(0,jsx_runtime.jsxs)(ContainerDiv,{$descriptionPosition:descriptionPosition,style,children:[description&&["top","left"].includes(descriptionPosition)&&description,(0,jsx_runtime.jsxs)(Label,{$size:size,children:[(0,jsx_runtime.jsx)(ToggleInput,{type:"checkbox",checked:isOn,onChange:()=>{readonly||disabled||(setIsOn((prevState=>!prevState)),onChange())},readOnly:readonly,disabled}),(0,jsx_runtime.jsxs)(TrackDiv,{$variant:variant,$isOn:isOn,$offColor:offColor,$onColor:onColor,children:[(0,jsx_runtime.jsx)(LabelSpan,{$size:size,$isOn:isOn,$onColor:onLabelColor,$offColor:offLabelColor,children:isOn?onLabel:offLabel}),(0,jsx_runtime.jsx)(ThumbSpan,{$variant:variant,$size:size,$isOn:isOn,$offColor:thumbOffColor,$onColor:thumbOnColor,children:isOn?onThumb:offThumb})]})]}),description&&["bottom","right"].includes(descriptionPosition)&&description]})},Switch_Switch=Switch;try{Switch.displayName="Switch",Switch.__docgenInfo={description:"Switch 컴포넌트",displayName:"Switch",props:{checked:{defaultValue:null,description:"",name:"checked",required:!0,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"() => void"}},size:{defaultValue:{value:"md"},description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},variant:{defaultValue:{value:"solid"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"solid"'},{value:'"raised"'}]}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},description:{defaultValue:null,description:"",name:"description",required:!1,type:{name:"ReactNode"}},descriptionPosition:{defaultValue:{value:"right"},description:"",name:"descriptionPosition",required:!1,type:{name:"enum",value:[{value:'"bottom"'},{value:'"left"'},{value:'"right"'},{value:'"top"'}]}},onLabel:{defaultValue:null,description:"",name:"onLabel",required:!1,type:{name:"ReactNode"}},offLabel:{defaultValue:null,description:"",name:"offLabel",required:!1,type:{name:"ReactNode"}},onThumb:{defaultValue:null,description:"",name:"onThumb",required:!1,type:{name:"ReactNode"}},offThumb:{defaultValue:null,description:"",name:"offThumb",required:!1,type:{name:"ReactNode"}},readonly:{defaultValue:{value:"false"},description:"",name:"readonly",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},onColor:{defaultValue:null,description:"",name:"onColor",required:!1,type:{name:"string"}},offColor:{defaultValue:null,description:"",name:"offColor",required:!1,type:{name:"string"}},onLabelColor:{defaultValue:null,description:"",name:"onLabelColor",required:!1,type:{name:"string"}},offLabelColor:{defaultValue:null,description:"",name:"offLabelColor",required:!1,type:{name:"string"}},thumbOnColor:{defaultValue:null,description:"",name:"thumbOnColor",required:!1,type:{name:"string"}},thumbOffColor:{defaultValue:null,description:"",name:"thumbOffColor",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Switch/Switch.tsx#Switch"]={docgenInfo:Switch.__docgenInfo,name:"Switch",path:"src/components/common/Switch/Switch.tsx#Switch"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.I4.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})},Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team/TeamBadge/TeamBadge.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>TeamBadge_TeamBadge});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Wrapper=styled_components_browser_esm.I4.div.withConfig({shouldForwardProp:prop=>!["teamPlaceColor","size"].includes(prop)})`
  ${({size})=>"sm"===size?styled_components_browser_esm.AH`
        width: 6px;
        height: 6px;
      `:"lg"===size?styled_components_browser_esm.AH`
        width: 24px;
        height: 24px;
      `:styled_components_browser_esm.AH`
      width: 20px;
      height: 20px;
    `}

  border-radius: 50%;
  background-color: ${({theme,teamPlaceColor})=>theme.teamColor[teamPlaceColor]};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TeamBadge=props=>{const{teamPlaceColor,size="md"}=props;return(0,jsx_runtime.jsx)(Wrapper,{teamPlaceColor,size})},TeamBadge_TeamBadge=TeamBadge;try{TeamBadge.displayName="TeamBadge",TeamBadge.__docgenInfo={description:"",displayName:"TeamBadge",props:{teamPlaceColor:{defaultValue:null,description:"",name:"teamPlaceColor",required:!0,type:{name:"enum",value:[{value:"0"},{value:"1"},{value:"2"},{value:"3"},{value:"4"},{value:"5"},{value:"6"},{value:"7"},{value:"8"},{value:"9"},{value:"100"}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team/TeamBadge/TeamBadge.tsx#TeamBadge"]={docgenInfo:TeamBadge.__docgenInfo,name:"TeamBadge",path:"src/components/team/TeamBadge/TeamBadge.tsx#TeamBadge"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/team_calendar/TimeTableMenu/TimeTableMenu.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>TimeTableMenu_TimeTableMenu});var Menu=__webpack_require__("./src/components/common/Menu/Menu.tsx"),calendar=__webpack_require__("./src/constants/calendar.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");var getIsMobile=__webpack_require__("./src/utils/getIsMobile.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const TimeTableMenu=props=>{const{displayValue,onSelect}=props,isMobile=(0,getIsMobile.N)();return(0,jsx_runtime.jsxs)(Menu.A,{children:[(0,jsx_runtime.jsx)(Menu.A.Button,{css:($isMobile=isMobile,styled_components_browser_esm.AH`
  width: ${$isMobile?"100px":"130px"};
  height: 36px;
  padding: 0;

  border: 1px solid ${({theme})=>theme.color.GRAY200};
  border-radius: 4px;
`),value:displayValue}),(0,jsx_runtime.jsx)(Menu.A.List,{onSelect:value=>{onSelect(value)},children:calendar.tD.map((time=>(0,jsx_runtime.jsx)(Menu.A.Item,{value:time,children:time},time)))})]});var $isMobile},TimeTableMenu_TimeTableMenu=TimeTableMenu;try{TimeTableMenu.displayName="TimeTableMenu",TimeTableMenu.__docgenInfo={description:"",displayName:"TimeTableMenu",props:{displayValue:{defaultValue:null,description:"",name:"displayValue",required:!0,type:{name:"string"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!0,type:{name:"(value: string) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/team_calendar/TimeTableMenu/TimeTableMenu.tsx#TimeTableMenu"]={docgenInfo:TimeTableMenu.__docgenInfo,name:"TimeTableMenu",path:"src/components/team_calendar/TimeTableMenu/TimeTableMenu.tsx#TimeTableMenu"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/calendar.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{CZ:()=>ONE_DAY,Dd:()=>SCHEDULE_DESCRIPTION_MAX_LENGTH,Q7:()=>SCHEDULE_CIRCLE_MAX_COUNT,T4:()=>CALENDAR,j_:()=>DAYS_OF_WEEK,kT:()=>MODAL_OPEN_TYPE,tD:()=>TIME_TABLE});var _utils_arrayOf__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/utils/arrayOf.ts");const DAYS_OF_WEEK=["일","월","화","수","목","금","토"],ONE_DAY=864e5,CALENDAR={ROW_SIZE:6,COLUMN_SIZE:7},TIME_TABLE=(0,_utils_arrayOf__WEBPACK_IMPORTED_MODULE_0__.j)(48).map(((_,i)=>`${String(Math.floor(i/2)).padStart(2,"0")}:${i%2==0?"00":"30"}`)),SCHEDULE_CIRCLE_MAX_COUNT=3,SCHEDULE_DESCRIPTION_MAX_LENGTH=100,MODAL_OPEN_TYPE={ADD:"add",VIEW:"view",EDIT:"edit",DAILY:"daily",EXPORT:"export"}},"./src/hooks/schedule/useDateTimeRange.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{a:()=>useDateTimeRange});var react=__webpack_require__("./node_modules/react/index.js"),calendar=__webpack_require__("./src/constants/calendar.ts");var generateYYYYMMDDHHMM=__webpack_require__("./src/utils/generateYYYYMMDDHHMM.ts"),typeGuard=__webpack_require__("./src/types/typeGuard.ts");const getDateDifference=(beforeDate,afterDate)=>(new Date(afterDate).getTime()-new Date(beforeDate).getTime())/calendar.CZ,getDateAfterDays=(date,days)=>{const afterDate=(date=>`${String(date.getFullYear()).padStart(4,"0")}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`)(new Date(new Date(date).getTime()+calendar.CZ*days));return afterDate},isDateTimeRangeValid=dateTimeRange=>{const{startDate,endDate,startTime,endTime}=dateTimeRange,startDateTime=`${startDate} ${startTime}`,endDateTime=`${endDate} ${endTime}`;return(0,typeGuard.v)(startDateTime)&&(0,typeGuard.v)(endDateTime)&&startDateTime<=endDateTime},useDateTimeRange=(dateData,initTitle,initDescription)=>{const[dateTimeRange,setDateTimeRange]=(0,react.useState)(((dateData,title,initDescription)=>{if(!dateData)return{title:title??"",startDate:"",endDate:"",startTime:"09:00",endTime:"10:00",dateDifference:0,isAllDay:!1,description:initDescription??""};if(dateData instanceof Date){const[initDate]=(0,generateYYYYMMDDHHMM.E)(dateData).split(" ");return{title:title??"",startDate:initDate,endDate:initDate,startTime:"09:00",endTime:"10:00",dateDifference:0,isAllDay:!1,description:initDescription??""}}const[startDate,startTime]=dateData.startDateTime.split(" "),[endDate,endTime]=dateData.endDateTime.split(" ");return{title:title??"",startDate,startTime,endDate,endTime,dateDifference:(0,typeGuard.N)(startDate)&&(0,typeGuard.N)(endDate)?getDateDifference(startDate,endDate):0,isAllDay:"23:59"===endTime,description:initDescription??""}})(dateData,initTitle,initDescription)),{title,description,startDate,endDate,startTime,endTime,dateDifference,isAllDay}=dateTimeRange;return{handleScheduleChange:e=>{const{name,value}=e.target;["title","startDate","endDate"].includes(name)&&setDateTimeRange((prev=>({...prev,[name]:value})))},handleScheduleBlur:e=>{const{name}=e.target;if(!["startDate","endDate"].includes(name)||!(0,typeGuard.N)(startDate)||!(0,typeGuard.N)(endDate))return;if("startDate"===name){const newEndDate=getDateAfterDays(startDate,dateDifference);return void setDateTimeRange((prev=>({...prev,endDate:newEndDate})))}const newDateDifference=getDateDifference(startDate,endDate);setDateTimeRange((prev=>({...prev,dateDifference:newDateDifference})))},handleStartTimeChange:newStartTime=>{const newDateTimeRange={...dateTimeRange,startTime:newStartTime};setDateTimeRange(startDate<endDate||newStartTime<=endTime?()=>newDateTimeRange:()=>({...newDateTimeRange,endTime:newStartTime}))},handleEndTimeChange:newEndTime=>{const newDateTimeRange={...dateTimeRange,endTime:newEndTime};setDateTimeRange(startDate<endDate||startTime<=newEndTime?()=>newDateTimeRange:()=>({...newDateTimeRange,startTime:newEndTime}))},handleIsAllDayChange:()=>{setDateTimeRange((prev=>({...prev,isAllDay:!prev.isAllDay})))},handleDescriptionChange:description=>{setDateTimeRange((prev=>({...prev,description})))},title,startDate,endDate,description,startTime:isAllDay?"00:00":startTime,endTime:isAllDay?"23:59":endTime,isValid:isDateTimeRangeValid(dateTimeRange),isAllDay}}},"./src/hooks/useClickOutside.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{L:()=>useClickOutside});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const useClickOutside=(ref,callback)=>{(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{const handleClickOutside=e=>{ref.current&&!ref.current.contains(e.target)&&callback(e)};return document.addEventListener("mousedown",handleClickOutside),document.addEventListener("touchstart",handleClickOutside),()=>{document.removeEventListener("mousedown",handleClickOutside),document.removeEventListener("touchstart",handleClickOutside)}}),[callback,ref])}},"./src/hooks/useModal.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{h:()=>useModal});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Modal/ModalContext.tsx");const useModal=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__.V);if(void 0===context)throw new Error("useModal must be used within a ModalProvider");return context}},"./src/hooks/useTeamPlace.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Y:()=>useTeamPlace});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/TeamPlaceContext.tsx");const useTeamPlace=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__.W);if(void 0===context)throw new Error("useTeamPlace must be used within a TeamPlaceContext");return context}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useToast});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Toast/ToastContext.tsx");const useToast=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__.$);if(void 0===context)throw new Error("useToast must be used within a ToastProvider");return context}},"./src/types/typeGuard.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>isYYYYMMDD,v:()=>isYYYYMMDDHHMM});const isYYYYMMDDHHMM=value=>"string"==typeof value&&/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value),isYYYYMMDD=value=>"string"==typeof value&&/^\d{4}-\d{2}-\d{2}$/.test(value)},"./src/utils/arrayOf.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{j:()=>arrayOf});const arrayOf=count=>[...new Array(count).keys()]},"./src/utils/getIsMobile.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>getIsMobile});const getIsMobile=()=>{const isIos=null!==window.navigator.userAgent.match(/ipad|iphone/i),isAndroid=null!==window.navigator.userAgent.match(/Android/i);return!(!isIos&&!isAndroid)}}}]);
//# sourceMappingURL=65.a4d3eeba.iframe.bundle.js.map