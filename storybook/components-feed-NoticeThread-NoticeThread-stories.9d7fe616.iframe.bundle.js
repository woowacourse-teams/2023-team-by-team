"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2547],{"./src/components/feed/NoticeThread/NoticeThread.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,MiddleContent:()=>MiddleContent,TooLongContent:()=>TooLongContent,__namedExportsOrder:()=>__namedExportsOrder,default:()=>NoticeThread_stories});var react=__webpack_require__("./node_modules/react/index.js"),Text=__webpack_require__("./src/components/common/Text/Text.tsx"),Button=__webpack_require__("./src/components/common/Button/Button.tsx"),ThumbnailList=__webpack_require__("./src/components/feed/ThumbnailList/ThumbnailList.tsx"),formatWriteTime=__webpack_require__("./src/utils/formatWriteTime.ts"),svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),png=__webpack_require__("./src/assets/png/index.ts");const Container=styled_components_browser_esm.zo.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({theme})=>theme.zIndex.NOTICE};

  padding-top: 10px;

  background-color: ${({theme})=>theme.color.GRAY100};
  border-bottom: 2px solid ${({theme})=>theme.color.PRIMARY200};

  transition: 0.3s;

  ${({$noticeSize})=>"sm"===$noticeSize?styled_components_browser_esm.iv`
        height: 80px;
      `:"md"===$noticeSize?styled_components_browser_esm.iv`
        height: 140px;
      `:"lg"===$noticeSize?styled_components_browser_esm.iv`
        height: 610px;
      `:void 0}
`,BackgroundContainer=styled_components_browser_esm.zo.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  height: 100%;

  border-radius: 20px 20px 0 0;
  background-image: url(${png.Ep});
  background-size: 100%;

  transition: 0.3s;

  ${({$noticeSize})=>"sm"===$noticeSize||"md"===$noticeSize?styled_components_browser_esm.iv`
        padding: 18px 20px 18px 28px;
      `:"lg"===$noticeSize?styled_components_browser_esm.iv`
        flex-direction: column;

        padding: 18px 20px 10px 28px;
      `:void 0}
`,InnerContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: center;
  position: relative;

  gap: 10px;
`,ArrowContainer=styled_components_browser_esm.zo.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`,ArrowIcon=styled_components_browser_esm.zo.div`
  width: 32px;
  height: 32px;

  opacity: ${({disabled})=>disabled?.3:1};

  color: ${({theme})=>theme.color.PRIMARY900};
`,MegaphoneWrapper=styled_components_browser_esm.zo.div`
  position: absolute;
  top: 0;

  width: 40px;
`,AuthorInfo=styled_components_browser_esm.zo.div`
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  overflow: hidden;
  column-gap: 8px;

  height: 16px;
`,ContentContainer=styled_components_browser_esm.zo.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding-left: 40px;

  width: 100%;
  gap: 4px;

  ${({$noticeSize})=>{if("lg"===$noticeSize)return styled_components_browser_esm.iv`
        height: 400px;
      `}}
`,Divider=styled_components_browser_esm.zo.span`
  display: inline-block;

  width: 1.5px;
  height: 16px;
  margin: 0 4px;

  background-color: ${({theme})=>theme.color.GRAY400};
`,authorInfoText=styled_components_browser_esm.iv`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${({theme})=>theme.color.GRAY500};
`,timeInfoText=styled_components_browser_esm.iv`
  color: ${({theme})=>theme.color.GRAY500};
`,contentField=noticeSize=>{let height="";return"sm"===noticeSize&&(height="24px"),"md"===noticeSize&&(height="66px"),"lg"===noticeSize&&(height="100%"),styled_components_browser_esm.iv`
    overflow: ${"lg"===noticeSize?" auto":" hidden"};
    text-overflow: ellipsis;
    white-space: pre-wrap;

    width: 100%;
    height: ${height};

    word-break: break-all;
  `},arrowButton=styled_components_browser_esm.iv`
  padding: 0;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const NoticeThread=props=>{const{authorName,createdAt,content,images,onClickImage}=props,[noticeSize,setNoticeSize]=(0,react.useState)("sm");return(0,jsx_runtime.jsx)(Container,{$noticeSize:noticeSize,children:(0,jsx_runtime.jsxs)(BackgroundContainer,{$noticeSize:noticeSize,children:[(0,jsx_runtime.jsxs)(InnerContainer,{$noticeSize:noticeSize,"aria-label":`${authorName}의 공지`,children:[(0,jsx_runtime.jsx)(MegaphoneWrapper,{children:(0,jsx_runtime.jsx)(svg.ps,{})}),(0,jsx_runtime.jsxs)(ContentContainer,{$noticeSize:noticeSize,children:[(0,jsx_runtime.jsx)(Text.Z,{size:"lg",weight:"semiBold",css:contentField(noticeSize),children:content}),images.length>0&&"lg"===noticeSize&&(0,jsx_runtime.jsx)(ThumbnailList.Z,{mode:"view",size:"sm",images,onClick:onClickImage}),"sm"!==noticeSize&&(0,jsx_runtime.jsxs)(AuthorInfo,{children:[(0,jsx_runtime.jsx)(Text.Z,{size:"sm",weight:"semiBold",css:authorInfoText,children:authorName}),(0,jsx_runtime.jsx)(Divider,{}),(0,jsx_runtime.jsx)("time",{children:(0,jsx_runtime.jsx)(Text.Z,{size:"xs",css:timeInfoText,children:(0,formatWriteTime.o)(createdAt)})})]})]})]}),(0,jsx_runtime.jsxs)(ArrowContainer,{children:[(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",disabled:"sm"===noticeSize,onClick:()=>{setNoticeSize((()=>"sm"))},css:arrowButton,"aria-label":"공지 접기",children:(0,jsx_runtime.jsx)(ArrowIcon,{disabled:"sm"===noticeSize,children:(0,jsx_runtime.jsx)(svg.j_,{})})}),(0,jsx_runtime.jsx)(Button.Z,{type:"button",variant:"plain",disabled:"lg"===noticeSize,onClick:()=>{"sm"===noticeSize&&setNoticeSize((()=>"md")),"md"===noticeSize&&setNoticeSize((()=>"lg"))},css:arrowButton,"aria-label":"공지 펼치기",children:(0,jsx_runtime.jsx)(ArrowIcon,{disabled:"lg"===noticeSize,children:(0,jsx_runtime.jsx)(svg.gV,{})})})]})]})})};NoticeThread.displayName="NoticeThread";const NoticeThread_NoticeThread=NoticeThread;try{NoticeThread.displayName="NoticeThread",NoticeThread.__docgenInfo={description:"",displayName:"NoticeThread",props:{authorName:{defaultValue:null,description:"",name:"authorName",required:!0,type:{name:"string"}},createdAt:{defaultValue:null,description:"",name:"createdAt",required:!0,type:{name:"`${string}-${string}-${string} ${string}:${string}`"}},content:{defaultValue:null,description:"",name:"content",required:!0,type:{name:"string"}},images:{defaultValue:null,description:"",name:"images",required:!0,type:{name:"ThreadImage[]"}},onClickImage:{defaultValue:null,description:"",name:"onClickImage",required:!0,type:{name:"(images: ThreadImage[], selectedImage: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/NoticeThread/NoticeThread.tsx#NoticeThread"]={docgenInfo:NoticeThread.__docgenInfo,name:"NoticeThread",path:"src/components/feed/NoticeThread/NoticeThread.tsx#NoticeThread"})}catch(__react_docgen_typescript_loader_error){}const NoticeThread_stories={title:"Feed/NoticeThread",component:NoticeThread_NoticeThread,tags:["autodocs"],decorators:[Story=>(0,jsx_runtime.jsx)("div",{style:{padding:"50px",backgroundColor:"#eee"},children:(0,jsx_runtime.jsx)(Story,{})})],parameters:{docs:{description:{component:"`NoticeThread` 는 피드 메뉴에서 사용될 공지 스레드 컴포넌트입니다.\n 피드 메뉴와 모아보기 페이지에서의 두 UI를 모두 제공합니다."}}}},Default={args:{authorName:"요술토끼",createdAt:"2022-03-04 12:34",content:"안녕하세요! 잘 부탁드립니다.\n안녕하세요! 잘 부탁드립니다.\n안녕하세요! 잘 부탁드립니다",images:[],onClickImage:()=>{alert("onClickImage")}}},MiddleContent={args:{authorName:"루루",createdAt:"2022-03-04 12:34",content:"안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.",images:[],onClickImage:()=>{alert("onClickImage")}}},TooLongContent={args:{authorName:"요술토끼",createdAt:"2022-03-04 12:34",content:'The Enigmatic Nature of Quantum Entanglement: Unraveling the Mysteries of Nonlocality\n\nIntroduction\n\nQuantum entanglement, a cornerstone phenomenon in quantum mechanics, has baffled physicists and philosophers alike since its discovery in the early 20th century. This essay delves into the intricacies of quantum entanglement, exploring its counterintuitive properties and profound implications on our understanding of reality. We shall embark on a journey through the mysterious realm of nonlocality, where seemingly disconnected particles share an inexplicable, instantaneous connection, defying classical notions of causality and locality.\n\nI. Historical Background and Quantum Entanglement Basics\n\nThe concept of quantum entanglement first emerged in 1935, as Erwin Schrödinger famously described it as "spooky action at a distance." The basic idea involves the entangling of two or more quantum particles, such as photons or electrons, in a way that their quantum states become inextricably linked. Once entangled, the particles exhibit a peculiar behavior - any change to the state of one particle instantaneously affects the state of its entangled partner, regardless of the spatial separation between them.\n\nII. Nonlocality and Bells Inequality\n\nThe nonlocality inherent in quantum entanglement challenges the classical principles of locality and causality. John Bells groundbreaking work in the 1960s led to the formulation of Bells inequality, a mathematical criterion to test whether quantum mechanics adheres to local realism or if it must embrace nonlocality.\n\nIII. Entanglement and the Measurement Problem\n\nThe measurement problem, a central conundrum in quantum mechanics, becomes even more enigmatic in the context of quantum entanglement. When we observe one of the entangled particles, it collapses into a definite state, instantaneously determining the state of its entangled partner, regardless of the distance between them. This raises philosophical questions about the nature of reality, the role of the observer, and the existence of multiple realities or parallel universes.\n\nIV. Quantum Entanglement and Quantum Computing\n\nThe mind-boggling implications of quantum entanglement extend far beyond philosophical debates. The field of quantum computing exploits the phenomenon of entanglement to perform computations exponentially faster than classical computers. Quantum bits, or qubits, in a superposition of states can be entangled to enhance information processing capabilities, revolutionizing various industries, including cryptography, optimization, and drug discovery.\n\nV. Entanglement and Spacetime\n\nQuantum entanglement also intertwines with the fabric of spacetime, as suggested by recent theoretical research. Some physicists propose that entanglement may have a crucial role in understanding quantum gravity, reconciling the macroscopic world of general relativity with the microscopic world of quantum mechanics. The entanglement entropy is believed to be linked to the holographic principle, providing a deeper understanding of the fundamental nature of our universe.\n\nConclusion\n\nIn conclusion, quantum entanglement stands as one of the most profound and bewildering phenomena in modern physics. Its inherent nonlocality challenges the very fabric of reality, forcing us to reconsider our classical intuitions about causality and locality. From philosophical dilemmas to groundbreaking technological applications, quantum entanglement continues to push the boundaries of our knowledge, enticing us with the promise of unraveling the deepest secrets of the cosmos. The enigma of entanglement reminds us that there are still uncharted territories in the universe, waiting for the curious minds of future generations to explore and understand fully.',images:[],onClickImage:()=>{alert("onClickImage")}}};Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    authorName: '요술토끼',\n    createdAt: '2022-03-04 12:34',\n    content: '안녕하세요! 잘 부탁드립니다.\\n안녕하세요! 잘 부탁드립니다.\\n안녕하세요! 잘 부탁드립니다',\n    images: [],\n    onClickImage: () => {\n      alert('onClickImage');\n    }\n  }\n}",...Default.parameters?.docs?.source}}},MiddleContent.parameters={...MiddleContent.parameters,docs:{...MiddleContent.parameters?.docs,source:{originalSource:"{\n  args: {\n    authorName: '루루',\n    createdAt: '2022-03-04 12:34',\n    content: '안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.안녕하세요! 잘 부탁드립니다.',\n    images: [],\n    onClickImage: () => {\n      alert('onClickImage');\n    }\n  }\n}",...MiddleContent.parameters?.docs?.source}}},TooLongContent.parameters={...TooLongContent.parameters,docs:{...TooLongContent.parameters?.docs,source:{originalSource:"{\n  args: {\n    authorName: '요술토끼',\n    createdAt: '2022-03-04 12:34',\n    content: 'The Enigmatic Nature of Quantum Entanglement: Unraveling the Mysteries of Nonlocality\\n\\nIntroduction\\n\\nQuantum entanglement, a cornerstone phenomenon in quantum mechanics, has baffled physicists and philosophers alike since its discovery in the early 20th century. This essay delves into the intricacies of quantum entanglement, exploring its counterintuitive properties and profound implications on our understanding of reality. We shall embark on a journey through the mysterious realm of nonlocality, where seemingly disconnected particles share an inexplicable, instantaneous connection, defying classical notions of causality and locality.\\n\\nI. Historical Background and Quantum Entanglement Basics\\n\\nThe concept of quantum entanglement first emerged in 1935, as Erwin Schrödinger famously described it as \"spooky action at a distance.\" The basic idea involves the entangling of two or more quantum particles, such as photons or electrons, in a way that their quantum states become inextricably linked. Once entangled, the particles exhibit a peculiar behavior - any change to the state of one particle instantaneously affects the state of its entangled partner, regardless of the spatial separation between them.\\n\\nII. Nonlocality and Bells Inequality\\n\\nThe nonlocality inherent in quantum entanglement challenges the classical principles of locality and causality. John Bells groundbreaking work in the 1960s led to the formulation of Bells inequality, a mathematical criterion to test whether quantum mechanics adheres to local realism or if it must embrace nonlocality.\\n\\nIII. Entanglement and the Measurement Problem\\n\\nThe measurement problem, a central conundrum in quantum mechanics, becomes even more enigmatic in the context of quantum entanglement. When we observe one of the entangled particles, it collapses into a definite state, instantaneously determining the state of its entangled partner, regardless of the distance between them. This raises philosophical questions about the nature of reality, the role of the observer, and the existence of multiple realities or parallel universes.\\n\\nIV. Quantum Entanglement and Quantum Computing\\n\\nThe mind-boggling implications of quantum entanglement extend far beyond philosophical debates. The field of quantum computing exploits the phenomenon of entanglement to perform computations exponentially faster than classical computers. Quantum bits, or qubits, in a superposition of states can be entangled to enhance information processing capabilities, revolutionizing various industries, including cryptography, optimization, and drug discovery.\\n\\nV. Entanglement and Spacetime\\n\\nQuantum entanglement also intertwines with the fabric of spacetime, as suggested by recent theoretical research. Some physicists propose that entanglement may have a crucial role in understanding quantum gravity, reconciling the macroscopic world of general relativity with the microscopic world of quantum mechanics. The entanglement entropy is believed to be linked to the holographic principle, providing a deeper understanding of the fundamental nature of our universe.\\n\\nConclusion\\n\\nIn conclusion, quantum entanglement stands as one of the most profound and bewildering phenomena in modern physics. Its inherent nonlocality challenges the very fabric of reality, forcing us to reconsider our classical intuitions about causality and locality. From philosophical dilemmas to groundbreaking technological applications, quantum entanglement continues to push the boundaries of our knowledge, enticing us with the promise of unraveling the deepest secrets of the cosmos. The enigma of entanglement reminds us that there are still uncharted territories in the universe, waiting for the curious minds of future generations to explore and understand fully.',\n    images: [],\n    onClickImage: () => {\n      alert('onClickImage');\n    }\n  }\n}",...TooLongContent.parameters?.docs?.source}}};const __namedExportsOrder=["Default","MiddleContent","TooLongContent"]},"./src/assets/png/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{WG:()=>feed_empty_image_namespaceObject,Rs:()=>link_empty_image_namespaceObject,Ok:()=>mouse_pointer_namespaceObject,Ep:()=>notice_thread_background_namespaceObject,wp:()=>thumbnail_fallback_image_namespaceObject});const notice_thread_background_namespaceObject=__webpack_require__.p+"static/media/notice-thread-background.48ca8103.png",link_empty_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/link-empty-image.5fc72217.png"),feed_empty_image_namespaceObject=__webpack_require__.p+"static/media/feed-empty-image.0ca39879.png",mouse_pointer_namespaceObject=__webpack_require__.p+"static/media/mouse-pointer.0c55151b.png",thumbnail_fallback_image_namespaceObject=(__webpack_require__.p,__webpack_require__.p+"static/media/thumbnail-fallback-image.c23bee9d.png")},"./src/components/common/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const paddingSize={sm:"6px",md:"12px",lg:"18px"},variants={primary:styled_components_browser_esm.iv`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Button=props=>{const{children,size,type="submit",variant,...rest}=props;return(0,jsx_runtime.jsx)(ButtonWrapper,{type,size,variant,...rest,children})};Button.displayName="Button";const Button_Button=Button;try{Button.displayName="Button",Button.__docgenInfo={description:"",displayName:"Button",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"reset"'},{value:'"submit"'}]}},variant:{defaultValue:null,description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"normal"'},{value:'"primary"'},{value:'"plain"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Button/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/components/common/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/common/Text/Text.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Text_Text});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const fontWeight={light:100,normal:400,semiBold:600,bold:800},fontSize={xxs:"10px",xs:"12px",sm:"14px",md:"16px",lg:"18px",xl:"20px",xxl:"22px"},TextWrapper=styled_components_browser_esm.zo.p.withConfig({shouldForwardProp:prop=>!["size","weight","css"].includes(prop)})`
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
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Text=props=>{const{as="p",size,weight,css,children}=props;return(0,jsx_runtime.jsx)(TextWrapper,{as,size,css,weight,children})};Text.displayName="Text";const Text_Text=Text;try{Text.displayName="Text",Text.__docgenInfo={description:"",displayName:"Text",props:{as:{defaultValue:null,description:"",name:"as",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"h1"'},{value:'"h2"'},{value:'"h3"'},{value:'"h4"'},{value:'"h5"'},{value:'"h6"'},{value:'"p"'},{value:'"span"'},{value:'"strong"'}]}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"xxs"'},{value:'"xs"'},{value:'"sm"'},{value:'"md"'},{value:'"lg"'},{value:'"xl"'},{value:'"xxl"'}]}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"enum",value:[{value:'"bold"'},{value:'"normal"'},{value:'"light"'},{value:'"semiBold"'}]}},css:{defaultValue:null,description:"",name:"css",required:!1,type:{name:"CSSProp"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/common/Text/Text.tsx#Text"]={docgenInfo:Text.__docgenInfo,name:"Text",path:"src/components/common/Text/Text.tsx#Text"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>DeletableThumbnail_DeletableThumbnail});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.li`
  display: inline-block;
  flex-shrink: 0;
  position: relative;

  width: 96px;
  height: 96px;

  border-radius: 12px;
`,Image=styled_components_browser_esm.zo.img`
  width: 100%;
  height: 100%;

  border-radius: 12px;

  object-fit: cover;
`,deleteButton=styled_components_browser_esm.iv`
  position: absolute;
  top: -4px;
  right: -4px;

  width: 24px;
  height: 24px;
  padding: 0;

  border-radius: 4px;
  box-shadow: 0 3px 6px ${({theme})=>theme.color.GRAY400};
  background-color: ${({theme})=>theme.color.GRAY100};

  & svg {
    width: 18px;
    height: 18px;
  }
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),svg=__webpack_require__("./src/assets/svg/index.ts"),png=__webpack_require__("./src/assets/png/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const DeletableThumbnail=props=>{const{image,onDelete,isUploading}=props,{uuid,url}=image;return(0,jsx_runtime.jsxs)(Container,{children:[(0,jsx_runtime.jsx)(Image,{src:url,alt:"미리보기 이미지",onError:e=>{e.currentTarget.src=png.wp,e.currentTarget.alt="손상된 이미지"}}),!isUploading&&(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:deleteButton,onClick:()=>onDelete(uuid),"aria-label":`${url} 이미지 삭제하기`,children:(0,jsx_runtime.jsx)(svg.gH,{})})]})};DeletableThumbnail.displayName="DeletableThumbnail";const DeletableThumbnail_DeletableThumbnail=DeletableThumbnail;try{DeletableThumbnail.displayName="DeletableThumbnail",DeletableThumbnail.__docgenInfo={description:"",displayName:"DeletableThumbnail",props:{image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"PreviewImage"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!0,type:{name:"(imageUuid: string) => void"}},isUploading:{defaultValue:null,description:"",name:"isUploading",required:!0,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx#DeletableThumbnail"]={docgenInfo:DeletableThumbnail.__docgenInfo,name:"DeletableThumbnail",path:"src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx#DeletableThumbnail"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/ImageAddButton/ImageAddButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ImageAddButton_ImageAddButton});var svg=__webpack_require__("./src/assets/svg/index.ts"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const FakeButton=styled_components_browser_esm.zo.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 96px;
  height: 96px;

  border-radius: 12px;
  background-color: #dee1ff;

  transition: 0.2s;

  cursor: pointer;

  &:hover {
    background-color: #e8eaff;
  }

  & svg {
    color: #9792ff;
  }
`,FileUploadInput=styled_components_browser_esm.zo.input`
  display: none;
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ImageAddButton=props=>{const{onChangeImage}=props;return(0,jsx_runtime.jsxs)("label",{children:[(0,jsx_runtime.jsx)(FakeButton,{role:"button","aria-label":"이미지 추가",children:(0,jsx_runtime.jsx)(svg.pO,{})}),(0,jsx_runtime.jsx)(FileUploadInput,{type:"file",accept:"image/*",onChange:onChangeImage,multiple:!0})]})};ImageAddButton.displayName="ImageAddButton";const ImageAddButton_ImageAddButton=ImageAddButton;try{ImageAddButton.displayName="ImageAddButton",ImageAddButton.__docgenInfo={description:"",displayName:"ImageAddButton",props:{onChangeImage:{defaultValue:null,description:"",name:"onChangeImage",required:!0,type:{name:"(e: ChangeEvent<HTMLInputElement>) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ImageAddButton/ImageAddButton.tsx#ImageAddButton"]={docgenInfo:ImageAddButton.__docgenInfo,name:"ImageAddButton",path:"src/components/feed/ImageAddButton/ImageAddButton.tsx#ImageAddButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/ThumbnailList/ThumbnailList.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ThumbnailList_ThumbnailList});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.ul`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  column-gap: 12px;

  width: 100%;
  height: 116px;

  ${({$mode})=>"view"===$mode?styled_components_browser_esm.iv`
          overflow-x: auto;
          overflow-y: hidden;

          padding-bottom: 20px;
        `:styled_components_browser_esm.iv`
          overflow-x: visible;
        `}
`;var DeletableThumbnail=__webpack_require__("./src/components/feed/DeletableThumbnail/DeletableThumbnail.tsx"),ViewableThumbnail=__webpack_require__("./src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx"),ImageAddButton=__webpack_require__("./src/components/feed/ImageAddButton/ImageAddButton.tsx"),feed=__webpack_require__("./src/constants/feed.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ThumbnailList=props=>{const{mode,images}=props;return(0,jsx_runtime.jsxs)(Container,{role:"list",$mode:mode,children:["delete"===mode?images.map((image=>(0,jsx_runtime.jsx)(DeletableThumbnail.Z,{image,onDelete:props.onDelete,isUploading:props.isUploading},image.uuid))):images.map(((image,index)=>(0,jsx_runtime.jsx)(ViewableThumbnail.Z,{image,size:props.size,onClick:()=>props.onClick(images,index+1)},image.id))),"delete"===mode&&images.length<feed.vO&&!props.isUploading&&(0,jsx_runtime.jsx)(ImageAddButton.Z,{onChangeImage:props.onChange})]})};ThumbnailList.displayName="ThumbnailList";const ThumbnailList_ThumbnailList=ThumbnailList;try{ThumbnailList.displayName="ThumbnailList",ThumbnailList.__docgenInfo={description:"",displayName:"ThumbnailList",props:{mode:{defaultValue:null,description:"",name:"mode",required:!0,type:{name:"enum",value:[{value:'"view"'},{value:'"delete"'}]}},images:{defaultValue:null,description:"",name:"images",required:!0,type:{name:"PreviewImage[] | ThreadImage[]"}},onDelete:{defaultValue:null,description:"",name:"onDelete",required:!0,type:{name:"(imageUuid: string) => void"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"ChangeEventHandler<HTMLInputElement>"}},isUploading:{defaultValue:null,description:"",name:"isUploading",required:!0,type:{name:"boolean"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"(images: ThreadImage[], selectedImage: number) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ThumbnailList/ThumbnailList.tsx#ThumbnailList"]={docgenInfo:ThumbnailList.__docgenInfo,name:"ThumbnailList",path:"src/components/feed/ThumbnailList/ThumbnailList.tsx#ThumbnailList"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ViewableThumbnail_ViewableThumbnail});var styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");const Container=styled_components_browser_esm.zo.li`
  flex-shrink: 0;

  width: ${({$size="md"})=>"md"===$size?"96px":"76px"};
  height: ${({$size="md"})=>"md"===$size?"96px":"76px"};

  border-radius: ${({$size="md"})=>"md"===$size?"12px":"10px"};
`,Image=styled_components_browser_esm.zo.img`
  width: 100%;
  height: 100%;

  border-radius: 12px;

  object-fit: cover;
`,viewButton=styled_components_browser_esm.iv`
  width: 100%;
  height: 100%;
  padding: 0;

  border-radius: 12px;
`;var Button=__webpack_require__("./src/components/common/Button/Button.tsx"),png=__webpack_require__("./src/assets/png/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const ViewableThumbnail=props=>{const{image,size="md",onClick}=props,{isExpired,name,url}=image;return(0,jsx_runtime.jsx)(Container,{$size:size,children:(0,jsx_runtime.jsx)(Button.Z,{variant:"plain",type:"button",css:viewButton,onClick,"aria-label":`${name} 이미지 자세히 보기`,children:(0,jsx_runtime.jsx)(Image,{src:isExpired?png.wp:url,alt:name,onError:e=>{e.currentTarget.src=png.wp,e.currentTarget.alt="손상된 이미지"}})})})};ViewableThumbnail.displayName="ViewableThumbnail";const ViewableThumbnail_ViewableThumbnail=ViewableThumbnail;try{ViewableThumbnail.displayName="ViewableThumbnail",ViewableThumbnail.__docgenInfo={description:"",displayName:"ViewableThumbnail",props:{image:{defaultValue:null,description:"",name:"image",required:!0,type:{name:"ThreadImage"}},size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'}]}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx#ViewableThumbnail"]={docgenInfo:ViewableThumbnail.__docgenInfo,name:"ViewableThumbnail",path:"src/components/feed/ViewableThumbnail/ViewableThumbnail.tsx#ViewableThumbnail"})}catch(__react_docgen_typescript_loader_error){}},"./src/constants/feed.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{KD:()=>THREAD_TYPE,Yz:()=>THREAD_SIZE,rW:()=>DEFAULT_MAX_THREAD_HEIGHT,vO:()=>MAX_UPLOAD_IMAGE_COUNT});const DEFAULT_MAX_THREAD_HEIGHT=500,THREAD_TYPE={THREAD:"thread",NOTIFICATION:"notification"},THREAD_SIZE=20,MAX_UPLOAD_IMAGE_COUNT=4},"./src/utils/formatWriteTime.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{o:()=>formatWriteTime});const formatWriteTime=rawDateTime=>rawDateTime.replaceAll("-","/")}}]);
//# sourceMappingURL=components-feed-NoticeThread-NoticeThread-stories.9d7fe616.iframe.bundle.js.map