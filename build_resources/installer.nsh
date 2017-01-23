!macro customHeader
!macroend

!macro customInit
!macroend

!macro customInstall

  SetOutPath $INSTDIR

  !system "echo 'hello' > ${INST_DIR}/customInstall"
  
!macroend