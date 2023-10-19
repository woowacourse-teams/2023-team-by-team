"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4938],{"./node_modules/@tanstack/react-query/build/lib/useMutation.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>useMutation});var react=__webpack_require__("./node_modules/react/index.js"),utils=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/utils.mjs"),mutation=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/mutation.mjs"),notifyManager=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/notifyManager.mjs"),subscribable=__webpack_require__("./node_modules/@tanstack/query-core/build/lib/subscribable.mjs");class MutationObserver extends subscribable.l{constructor(client,options){super(),this.client=client,this.setOptions(options),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(options){var _this$currentMutation;const prevOptions=this.options;this.options=this.client.defaultMutationOptions(options),(0,utils.VS)(prevOptions,this.options)||this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(_this$currentMutation=this.currentMutation)||_this$currentMutation.setOptions(this.options)}onUnsubscribe(){var _this$currentMutation2;this.hasListeners()||(null==(_this$currentMutation2=this.currentMutation)||_this$currentMutation2.removeObserver(this))}onMutationUpdate(action){this.updateResult();const notifyOptions={listeners:!0};"success"===action.type?notifyOptions.onSuccess=!0:"error"===action.type&&(notifyOptions.onError=!0),this.notify(notifyOptions)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(variables,options){return this.mutateOptions=options,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==variables?variables:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){const state=this.currentMutation?this.currentMutation.state:(0,mutation.R)(),result={...state,isLoading:"loading"===state.status,isSuccess:"success"===state.status,isError:"error"===state.status,isIdle:"idle"===state.status,mutate:this.mutate,reset:this.reset};this.currentResult=result}notify(options){notifyManager.V.batch((()=>{var _this$mutateOptions$o,_this$mutateOptions,_this$mutateOptions$o2,_this$mutateOptions2;if(this.mutateOptions&&this.hasListeners())if(options.onSuccess)null==(_this$mutateOptions$o=(_this$mutateOptions=this.mutateOptions).onSuccess)||_this$mutateOptions$o.call(_this$mutateOptions,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o2=(_this$mutateOptions2=this.mutateOptions).onSettled)||_this$mutateOptions$o2.call(_this$mutateOptions2,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context);else if(options.onError){var _this$mutateOptions$o3,_this$mutateOptions3,_this$mutateOptions$o4,_this$mutateOptions4;null==(_this$mutateOptions$o3=(_this$mutateOptions3=this.mutateOptions).onError)||_this$mutateOptions$o3.call(_this$mutateOptions3,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(_this$mutateOptions$o4=(_this$mutateOptions4=this.mutateOptions).onSettled)||_this$mutateOptions$o4.call(_this$mutateOptions4,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context)}options.listeners&&this.listeners.forEach((({listener})=>{listener(this.currentResult)}))}))}}var useSyncExternalStore=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),lib_utils=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/utils.mjs");function useMutation(arg1,arg2,arg3){const options=(0,utils.lV)(arg1,arg2,arg3),queryClient=(0,QueryClientProvider.NL)({context:options.context}),[observer]=react.useState((()=>new MutationObserver(queryClient,options)));react.useEffect((()=>{observer.setOptions(options)}),[observer,options]);const result=(0,useSyncExternalStore.$)(react.useCallback((onStoreChange=>observer.subscribe(notifyManager.V.batchCalls(onStoreChange))),[observer]),(()=>observer.getCurrentResult()),(()=>observer.getCurrentResult())),mutate=react.useCallback(((variables,mutateOptions)=>{observer.mutate(variables,mutateOptions).catch(noop)}),[observer]);if(result.error&&(0,lib_utils.L)(observer.options.useErrorBoundary,[result.error]))throw result.error;return{...result,mutate,mutateAsync:result.mutate}}function noop(){}},"./src/components/link/LinkAddModal/LinkAddModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _components_link_LinkAddModal_LinkAddModal__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/link/LinkAddModal/LinkAddModal.tsx"),_hooks_useModal__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/hooks/useModal.ts"),_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/common/Button/Button.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Link/LinkAddModal",component:_components_link_LinkAddModal_LinkAddModal__WEBPACK_IMPORTED_MODULE_0__.Z,tags:["autodocs"]},SampleModal=()=>{const{openModal}=(0,_hooks_useModal__WEBPACK_IMPORTED_MODULE_1__.d)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__.Z,{onClick:openModal,children:"모달 열기"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_components_link_LinkAddModal_LinkAddModal__WEBPACK_IMPORTED_MODULE_0__.Z,{})]})},Default={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(SampleModal,{}),args:{}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <SampleModal />,\n  args: {}\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/apis/link.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{N:()=>sendTeamLink,m3:()=>deleteTeamLink,qp:()=>fetchTeamLinks});var _apis_http__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/apis/http.ts");const sendTeamLink=(teamPlaceId,body)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.post(`/api/team-place/${teamPlaceId}/team-links`,body),fetchTeamLinks=teamPlaceId=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.get(`/api/team-place/${teamPlaceId}/team-links`),deleteTeamLink=(teamPlaceId,teamLinkId)=>_apis_http__WEBPACK_IMPORTED_MODULE_0__.d.delete(`/api/team-place/${teamPlaceId}/team-links/${teamLinkId}`)},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.PRIMARY};
    color: ${({theme})=>theme.color.WHITE};
  `,normal:styled_components_browser_esm.iv`
    background-color: ${({theme})=>theme.color.WHITE};
    color: ${({theme})=>theme.color.GRAY900};
    border: 1px solid ${({theme})=>theme.color.GRAY300};
  `,plain:styled_components_browser_esm.iv`
    background-color: transparent;
    color: ${({theme})=>theme.color.GRAY900};
  `},ButtonWrapper=styled_components_browser_esm.zo.button`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Input/Input.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Input_Input});const InputWrapper=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js").zo.input`
  width: ${({width})=>width};
  height: ${({height})=>height};
  padding: 6px;

  border: 1px solid ${({theme})=>theme.color.GRAY200};

  font-size: 14px;

  && {
    ${props=>props.css}
  }
`;var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Input=(0,react.forwardRef)(((props,ref)=>{const{width,height,css,...rest}=props;return(0,jsx_runtime.jsx)(InputWrapper,{width,height,css,ref,...rest})}));Input.displayName="Input";const Input_Input=Input;try{Input.displayName="Input",Input.__docgenInfo={description:"",displayName:"Input",props:{css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"string"}},width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Input/Input.tsx#Input"]={docgenInfo:Input.__docgenInfo,name:"Input",path:"src/components/common/Input/Input.tsx#Input"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Modal/Modal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Modal_Modal});var react_dom=__webpack_require__("./node_modules/react-dom/index.js"),useModal=__webpack_require__("./src/hooks/useModal.ts"),react=__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Modal=props=>{const{children}=props,{isModalOpen,closeModal}=(0,useModal.d)();var triggerKey,callback;return triggerKey="Escape",callback=closeModal,(0,react.useEffect)((()=>{const handleKeydown=e=>{e.key===triggerKey&&callback()};return document.addEventListener("keydown",handleKeydown),()=>{document.removeEventListener("keydown",handleKeydown)}}),[callback,triggerKey]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:isModalOpen&&(0,react_dom.createPortal)((0,jsx_runtime.jsx)("div",{role:"dialog","aria-modal":!0,children}),document.body)})},Modal_Modal=Modal;try{Modal.displayName="Modal",Modal.__docgenInfo={description:"",displayName:"Modal",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Modal/Modal.tsx#Modal"]={docgenInfo:Modal.__docgenInfo,name:"Modal",path:"src/components/common/Modal/Modal.tsx#Modal"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/link/LinkAddModal/LinkAddModal.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>LinkAddModal_LinkAddModal});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Backdrop=styled_components_browser_esm.zo.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`,Container=styled_components_browser_esm.zo.div`
  position: fixed;
  ${({linkSize})=>"md"===linkSize?styled_components_browser_esm.iv`
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `:"sm"===linkSize?styled_components_browser_esm.iv`
        top: 96%;
        left: 14%;
        transform: translateY(-300px);
      `:void 0}

  display: flex;
  flex-direction: column;

  width: 496px;
  min-height: 320px;
  padding: 20px 30px;

  border-radius: 10px;
  box-shadow:
    0 0 1px #1b1d1f33,
    0 15px 25px #1b1d1f33,
    0 5px 10px #1b1d1f1f;
  background-color: ${({theme})=>theme.color.WHITE};

  & > form {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
`,IconWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 38px;
  margin-bottom: 22px;

  border-bottom: ${({theme})=>`1px solid ${theme.color.GRAY300}`};
`,InputContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,ControlButtonWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 40px;
`,submitButton=styled_components_browser_esm.iv`
  width: 90px;
`,closeButton=styled_components_browser_esm.iv`
  width: 22px;
  height: 38px;
  padding: 0;
`,title=styled_components_browser_esm.iv`
  padding: 10px 16px;

  border: none;
  border-radius: 10px;
  background-color: ${({theme})=>theme.color.GRAY200};

  font-size: 17px;
`;var Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Input=__webpack_require__("./src/components/common/Input/Input.tsx"),react=__webpack_require__("./node_modules/react/index.js"),QueryClientProvider=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs"),useMutation=__webpack_require__("./node_modules/@tanstack/react-query/build/lib/useMutation.mjs"),apis_link=__webpack_require__("./src/apis/link.ts");var useModal=__webpack_require__("./src/hooks/useModal.ts"),useTeamPlace=__webpack_require__("./src/hooks/useTeamPlace.ts"),useToast=__webpack_require__("./src/hooks/useToast.ts"),generateHttpsUrl=__webpack_require__("./src/utils/generateHttpsUrl.ts");const URL_REGEX=/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,useTeamLinkAddModal=linkRef=>{const{teamPlaceId}=(0,useTeamPlace.l)(),{closeModal}=(0,useModal.d)(),[linkName,setLinkName]=(0,react.useState)(""),[link,setLink]=(0,react.useState)(""),{showToast}=(0,useToast.p)(),{mutateSendTeamLink}=(teamPlaceId=>{const queryClient=(0,QueryClientProvider.NL)(),{mutate}=(0,useMutation.D)((body=>(0,apis_link.N)(teamPlaceId,body)),{onSuccess:()=>{queryClient.invalidateQueries(["teamLinks",teamPlaceId])}});return{mutateSendTeamLink:mutate}})(teamPlaceId),handleClose=()=>{setLinkName((()=>"")),setLink((()=>"")),closeModal()};return{linkName,link,handlers:{handleClose,handleTeamLinkSubmit:e=>{if(e.preventDefault(),!URL_REGEX.test(link))return showToast("error","올바르지 않은 링크 형식입니다."),void linkRef.current?.focus();mutateSendTeamLink({title:linkName,url:(0,generateHttpsUrl.x)(link)},{onSuccess:()=>{showToast("success","링크가 등록되었습니다."),handleClose()}})},handleLinkNameChange:e=>{const{value}=e.target;setLinkName((()=>value))},handleLinkChange:e=>{const{value}=e.target;setLink((()=>value))}}}};var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const LinkAddModal=props=>{const{linkSize="md"}=props,linkRef=(0,react.useRef)(null),{linkName,link,handlers:{handleClose,handleTeamLinkSubmit,handleLinkNameChange,handleLinkChange}}=useTeamLinkAddModal(linkRef);return(0,jsx_runtime.jsxs)(Modal.Z,{children:[(0,jsx_runtime.jsx)(Backdrop,{onClick:handleClose}),(0,jsx_runtime.jsxs)(Container,{linkSize,children:[(0,jsx_runtime.jsx)(IconWrapper,{children:(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",onClick:handleClose,css:closeButton,"aria-label":"팀 링크 등록 모달 닫기",children:(0,jsx_runtime.jsx)(svg.Tw,{})})}),(0,jsx_runtime.jsxs)("form",{onSubmit:handleTeamLinkSubmit,children:[(0,jsx_runtime.jsxs)(InputContainer,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"xl",weight:"semiBold",children:"링크 이름"}),(0,jsx_runtime.jsx)(Input.Z,{width:"100%",height:"38px",placeholder:"링크 이름을 입력해 주세요.",css:title,value:linkName,onChange:handleLinkNameChange,required:!0})]}),(0,jsx_runtime.jsxs)(InputContainer,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"xl",weight:"semiBold",children:"링크"}),(0,jsx_runtime.jsx)(Input.Z,{width:"100%",height:"38px",placeholder:"공유할 링크를 입력해 주세요.",css:title,value:link,ref:linkRef,onChange:handleLinkChange,required:!0})]}),(0,jsx_runtime.jsx)(ControlButtonWrapper,{children:(0,jsx_runtime.jsx)(Button.Z,{variant:"primary",css:submitButton,children:"등록"})})]})]})]})};LinkAddModal.displayName="LinkAddModal";const LinkAddModal_LinkAddModal=LinkAddModal;try{LinkAddModal.displayName="LinkAddModal",LinkAddModal.__docgenInfo={description:"",displayName:"LinkAddModal",props:{linkSize:{defaultValue:null,description:"",name:"linkSize",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/link/LinkAddModal/LinkAddModal.tsx#LinkAddModal"]={docgenInfo:LinkAddModal.__docgenInfo,name:"LinkAddModal",path:"src/components/link/LinkAddModal/LinkAddModal.tsx#LinkAddModal"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useModal.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useModal});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Modal/ModalContext.tsx");const useModal=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__.t);if(void 0===context)throw new Error("useModal must be used within a ModalProvider");return context}},"./src/hooks/useTeamPlace.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{l:()=>useTeamPlace});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/contexts/TeamPlaceContext.tsx");const useTeamPlace=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_contexts_TeamPlaceContext__WEBPACK_IMPORTED_MODULE_1__.Q);if(void 0===context)throw new Error("useTeamPlace must be used within a TeamPlaceContext");return context}},"./src/hooks/useToast.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>useToast});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Toast/ToastContext.tsx");const useToast=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Toast_ToastContext__WEBPACK_IMPORTED_MODULE_1__.u);if(void 0===context)throw new Error("useToast must be used within a ToastProvider");return context}},"./src/utils/generateHttpsUrl.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{x:()=>generateHttpsUrl});const HTTPS_PREFIX_REGEX=/^https?:\/\/.*/,generateHttpsUrl=url=>HTTPS_PREFIX_REGEX.test(url)?url:`https://${url}`}}]);
//# sourceMappingURL=components-link-LinkAddModal-LinkAddModal-stories.0b1a1382.iframe.bundle.js.map