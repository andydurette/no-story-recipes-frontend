const Footer = () => {
  let date = new Date();
  return (
    <div className={`p-4 bg-heavy-grey text-white m-auto`}>
      <p className="text-center">
        Copyright © Andy Durette {date.getFullYear()}
      </p>
    </div>
  );
};
export default Footer;
