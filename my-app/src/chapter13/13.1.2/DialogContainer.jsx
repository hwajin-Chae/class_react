import Dialog from "./Dialog";

function DialogContainer() {
  return (
    <>
      {/* WelcomeDialog */}
      <Dialog
        title="어서오세요."
        message="저희 우주선을 찾아주셔서 감사합니다!🛸✨"
        color="blue"
      />

      {/* AlertDialog */}
      <Dialog
        title="경고합니다."
        message="관계자 외 출입을 금지합니다👽🦴"
        color="red"
      />
    </>
  );
}

export default DialogContainer;