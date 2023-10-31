"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4783],{"./src/components/feed/ThreadImageModal/ThreadImageModal.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>ThreadImageModal_stories});var Carousel=__webpack_require__("./src/components/feed/Carousel/Carousel.tsx"),PageIndicator=__webpack_require__("./src/components/feed/PageIndicator/PageIndicator.tsx"),Modal=__webpack_require__("./src/components/common/Modal/Modal.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: ${({theme})=>theme.gradient.SMOOTH_BLACK};
  backdrop-filter: blur(10px);
`,HeaderWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 80px;
  padding: 20px;
`,CarouselWrapper=styled_components_browser_esm.zo.div`
  overflow: hidden;
  flex: 1 0;
`,PageIndicatorWrapper=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;

  height: 110px;
`,title=styled_components_browser_esm.iv`
  overflow: hidden;

  font-size: 26px;
  color: ${({theme})=>theme.color.WHITE};
  line-height: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
`,closeButton=styled_components_browser_esm.iv`
  width: 48px;
  height: 48px;
  padding: 5px;

  color: ${({theme})=>theme.color.WHITE};

  & svg {
    width: 38px;
    height: 38px;
  }
`;var react=__webpack_require__("./node_modules/react/index.js"),useModal=__webpack_require__("./src/hooks/useModal.ts"),svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ThreadImageModal=props=>{const{images,initialPage}=props,{closeModal}=(0,useModal.d)(),[currentPage,setCurrentPage]=(0,react.useState)(initialPage);return(0,jsx_runtime.jsx)(Modal.Z,{children:(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(HeaderWrapper,{children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"xxl",weight:"semiBold",css:title,children:images[currentPage-1].name}),(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:closeButton,onClick:closeModal,children:(0,jsx_runtime.jsx)(svg.Tw,{})})]}),(0,jsx_runtime.jsx)(CarouselWrapper,{children:(0,jsx_runtime.jsx)(Carousel.ZP,{width:"100%",height:"100%",images,currentPage,onChangePage:setCurrentPage})}),(0,jsx_runtime.jsx)(PageIndicatorWrapper,{children:(0,jsx_runtime.jsx)(PageIndicator.Z,{pageCount:images.length,currentPage,onChangePage:setCurrentPage})})]})})};ThreadImageModal.displayName="ThreadImageModal";const ThreadImageModal_ThreadImageModal=ThreadImageModal;try{ThreadImageModal.displayName="ThreadImageModal",ThreadImageModal.__docgenInfo={description:"",displayName:"ThreadImageModal",props:{images:{defaultValue:null,description:"",name:"images",required:!0,type:{name:"ThreadImage[]"}},initialPage:{defaultValue:null,description:"",name:"initialPage",required:!0,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ThreadImageModal/ThreadImageModal.tsx#ThreadImageModal"]={docgenInfo:ThreadImageModal.__docgenInfo,name:"ThreadImageModal",path:"src/components/feed/ThreadImageModal/ThreadImageModal.tsx#ThreadImageModal"})}catch(__react_docgen_typescript_loader_error){}const ThreadImageModal_stories={title:"feed/ThreadImageModal",component:ThreadImageModal_ThreadImageModal,tags:["autodocs"]},SampleModal=()=>{const{openModal}=(0,useModal.d)();return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Button.Z,{onClick:openModal,children:"모달 열기"}),(0,jsx_runtime.jsx)(ThreadImageModal_ThreadImageModal,{images:ThreadImageModal_stories_images,initialPage:1})]})},ThreadImageModal_stories_images=[{id:9283,isExpired:!1,name:"neon.png",url:"https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"},{id:4165,isExpired:!1,name:"donut.png",url:"https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"},{id:8729,isExpired:!1,name:"zXwMd93Xwz2V03M5xAw_fVmxzEwNiDv_93-xVm__902XvC-2XzOqPdR93F3Xz_24RzV01IjSwmOkVeZmIoPlLliFmMVc2__s9Xz.png",url:"https://images.unsplash.com/photo-1591382386627-349b692688ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"},{id:1092,isExpired:!1,name:"icon.png",url:"https://img.icons8.com/?size=256&id=VUoFEYkLOaMn&format=png&color=1A6DFF,C822FF"},{id:3493,isExpired:!0,name:"만료된 사진",url:""}],Default={render:()=>(0,jsx_runtime.jsx)(SampleModal,{}),args:{images:[],initialPage:1}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  render: () => <SampleModal />,\n  args: {\n    images: [],\n    initialPage: 1\n  }\n}",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/Carousel/Carousel.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ZP:()=>Carousel_Carousel});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  position: relative;

  width: ${({$width})=>$width};
  height: ${({$height})=>$height};
`,SlidesView=styled_components_browser_esm.zo.div`
  overflow: hidden;

  width: 100%;
  height: 100%;
  padding: 20px 0;
`,Slides=styled_components_browser_esm.zo.div`
  display: flex;
  height: 100%;

  transition: 0.4s;
  transform: ${({$currentPage})=>`translateX(-${$currentPage-1}00%)`};
`,buttonWrapper=styled_components_browser_esm.iv`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;

  width: 90px;
  height: 100%;
`,ArrowCircleLeftButtonWrapper=styled_components_browser_esm.zo.div`
  ${buttonWrapper}

  left: 0;
`,ArrowCircleRightButtonWrapper=styled_components_browser_esm.zo.div`
  ${buttonWrapper}

  right: 0;
`,arrowButton=(styled_components_browser_esm.iv`
  width: 40px;
  height: 40px;
`,styled_components_browser_esm.iv`
  width: 90px;
  padding: 0;

  & svg {
    width: 60px;
    height: 60px;
  }

  & svg > path {
    stroke: ${({theme})=>theme.color.WHITE};
  }
`);var CarouselImage=__webpack_require__("./src/components/feed/CarouselImage/CarouselImage.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Carousel=props=>{const{width,height,images,currentPage,onChangePage}=props;return(0,jsx_runtime.jsxs)(Container,{$width:width,$height:height,children:[(0,jsx_runtime.jsx)(SlidesView,{children:(0,jsx_runtime.jsx)(Slides,{$currentPage:currentPage,children:images.map((image=>(0,jsx_runtime.jsx)(CarouselImage.Z,{image},image.id)))})}),(0,jsx_runtime.jsx)(ArrowCircleLeftButtonWrapper,{children:(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:arrowButton,onClick:()=>onChangePage(((pageCount,currentPage)=>1===currentPage?pageCount:currentPage-1)(images.length,currentPage)),"aria-label":"이전 이미지 보기",children:(0,jsx_runtime.jsx)(svg.Y4,{})})}),(0,jsx_runtime.jsx)(ArrowCircleRightButtonWrapper,{children:(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:arrowButton,onClick:()=>onChangePage(((pageCount,currentPage)=>currentPage===pageCount?1:currentPage+1)(images.length,currentPage)),"aria-label":"다음 이미지 보기",children:(0,jsx_runtime.jsx)(svg.LZ,{})})})]})};Carousel.displayName="Carousel";const Carousel_Carousel=Carousel;try{Carousel.displayName="Carousel",Carousel.__docgenInfo={description:"",displayName:"Carousel",props:{width:{defaultValue:null,description:"",name:"width",required:!0,type:{name:"string"}},height:{defaultValue:null,description:"",name:"height",required:!0,type:{name:"string"}},images:{defaultValue:null,description:"",name:"images",required:!0,type:{name:"ThreadImage[]"}},currentPage:{defaultValue:null,description:"",name:"currentPage",required:!0,type:{name:"number"}},onChangePage:{defaultValue:null,description:"",name:"onChangePage",required:!0,type:{name:"(page: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/Carousel/Carousel.tsx#Carousel"]={docgenInfo:Carousel.__docgenInfo,name:"Carousel",path:"src/components/feed/Carousel/Carousel.tsx#Carousel"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/CarouselImage/CarouselImage.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>CarouselImage_CarouselImage});var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 100%;

  width: 100%;
  height: 100%;
  padding: 0 100px;

  & > img {
    max-width: 100%;
    max-height: 100%;
  }
`,errorText=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.WHITE};
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const CarouselImage=props=>{const{image}=props,{isExpired,name,url}=image,[errorMessage,setErrorMessage]=(0,react.useState)(isExpired?"이 이미지는 기간이 만료되었습니다.":null);return(0,jsx_runtime.jsx)(Container,{children:errorMessage?(0,jsx_runtime.jsx)(Text.Z,{as:"span",size:"xxl",css:errorText,children:errorMessage}):(0,jsx_runtime.jsx)("img",{src:url,alt:name,onError:()=>setErrorMessage((()=>"이미지를 표시하는 데 실패했습니다.\n올바르지 않은 형식의 이미지거나, 이미지가 손상되었을 수 있습니다."))})})};CarouselImage.displayName="CarouselImage";const CarouselImage_CarouselImage=CarouselImage;try{CarouselImage.displayName="CarouselImage",CarouselImage.__docgenInfo={description:"",displayName:"CarouselImage",props:{image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"ThreadImage"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/CarouselImage/CarouselImage.tsx#CarouselImage"]={docgenInfo:CarouselImage.__docgenInfo,name:"CarouselImage",path:"src/components/feed/CarouselImage/CarouselImage.tsx#CarouselImage"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/PageIndicator/PageIndicator.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>PageIndicator_PageIndicator});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.div`
  display: inline-flex;
  flex-direction: column;
  gap: 10px;

  height: 66px;
`,NumericIndicator=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  height: 40px;
`,DotIndicator=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: center;
  column-gap: 4px;
`,Dot=styled_components_browser_esm.zo.button`
  width: 14px;
  height: 14px;

  border-radius: 50%;
  background-color: ${({theme,$selected})=>$selected?theme.color.WHITE:theme.color.GRAY550};

  transition: 0.2s;
`,currentPageText=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.WHITE};
  font-size: 34px;
  line-height: 34px;
`,pageCountText=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.GRAY550};
  font-size: 24px;
  line-height: 30px;
`;var Text=__webpack_require__("./src/components/common/Text/Text.tsx"),arrayOf=__webpack_require__("./src/utils/arrayOf.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const PageIndicator=props=>{const{pageCount,currentPage,onChangePage}=props;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsxs)(NumericIndicator,{"aria-label":`${pageCount}개의 페이지 중 ${currentPage}번째 페이지`,children:[(0,jsx_runtime.jsx)(Text.Z,{as:"span",weight:"semiBold",css:currentPageText,children:currentPage}),(0,jsx_runtime.jsx)(Text.Z,{as:"span",weight:"semiBold",css:pageCountText,children:`/${pageCount}`})]}),(0,jsx_runtime.jsx)(DotIndicator,{children:(0,arrayOf.C)(pageCount).map(((_,index)=>(0,jsx_runtime.jsx)(Dot,{type:"button",onClick:()=>onChangePage(index+1),$selected:index+1===currentPage,"aria-label":`${index+1}번째 페이지 보기`},index)))})]})};PageIndicator.displayName="PageIndicator";const PageIndicator_PageIndicator=PageIndicator;try{PageIndicator.displayName="PageIndicator",PageIndicator.__docgenInfo={description:"",displayName:"PageIndicator",props:{pageCount:{defaultValue:null,description:"",name:"pageCount",required:!0,type:{name:"number"}},currentPage:{defaultValue:null,description:"",name:"currentPage",required:!0,type:{name:"number"}},onChangePage:{defaultValue:null,description:"",name:"onChangePage",required:!0,type:{name:"(page: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/PageIndicator/PageIndicator.tsx#PageIndicator"]={docgenInfo:PageIndicator.__docgenInfo,name:"PageIndicator",path:"src/components/feed/PageIndicator/PageIndicator.tsx#PageIndicator"})}catch(__react_docgen_typescript_loader_error){}},"./src/hooks/useModal.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{d:()=>useModal});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/common/Modal/ModalContext.tsx");const useModal=()=>{const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_components_common_Modal_ModalContext__WEBPACK_IMPORTED_MODULE_1__.t);if(void 0===context)throw new Error("useModal must be used within a ModalProvider");return context}},"./src/utils/arrayOf.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C:()=>arrayOf});const arrayOf=count=>[...new Array(count).keys()]}}]);
//# sourceMappingURL=components-feed-ThreadImageModal-ThreadImageModal-stories.98aa55b2.iframe.bundle.js.map