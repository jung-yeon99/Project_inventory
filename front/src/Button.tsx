import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const buttonStyle: React.CSSProperties = {
  backgroundColor: 'aqua',
  border: 'none',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button style={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

function Button2() {
  const handleClick = () => {
    alert('버튼이 클릭되었습니다!');
  };

  return (
    <div>
      <Button label='클릭하세요' onClick={handleClick} />
    </div>
  );
}

export default Button2;
