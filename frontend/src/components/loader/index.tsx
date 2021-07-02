import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loader = () => {
	return (
		<Container>
			<Waves />
			<Waves />
			<Waves />
			<Waves />
			<Waves />
			<Waves />
			<Waves />
			<Waves />
			<Waves />
			<Waves />
		</Container>
	);
};

export default Loader;

const wave = keyframes`
	0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
`;
const Waves = styled.div`
	width: 5px;
	height: 100px;
	background: linear-gradient(45deg, #fff, #ffa31a);
	margin: 10px;
	animation: ${wave} 1s linear infinite;
	border-radius: 20px;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	${Waves}:nth-child(2) {
		animation-delay: 0.1s;
	}
	${Waves}:nth-child(3) {
		animation-delay: 0.2s;
	}
	${Waves}:nth-child(4) {
		animation-delay: 0.3s;
	}
	${Waves}:nth-child(5) {
		animation-delay: 0.4s;
	}
	${Waves}:nth-child(6) {
		animation-delay: 0.5s;
	}
	${Waves}:nth-child(7) {
		animation-delay: 0.6s;
	}
	${Waves}:nth-child(8) {
		animation-delay: 0.7s;
	}
	${Waves}:nth-child(9) {
		animation-delay: 0.8s;
	}
	${Waves}:nth-child(10) {
		animation-delay: 0.9s;
	}
`;

/* .wave {
  width: 5px;
  height: 100px;
  background: linear-gradient(45deg, cyan, #fff);
  margin: 10px;
  animation: wave 1s linear infinite;
  border-radius: 20px;
}
.wave:nth-child(2) {
  animation-delay: 0.1s;
}
.wave:nth-child(3) {
  animation-delay: 0.2s;
}
.wave:nth-child(4) {
  animation-delay: 0.3s;
}
.wave:nth-child(5) {
  animation-delay: 0.4s;
}
.wave:nth-child(6) {
  animation-delay: 0.5s;
}
.wave:nth-child(7) {
  animation-delay: 0.6s;
}
.wave:nth-child(8) {
  animation-delay: 0.7s;
}
.wave:nth-child(9) {
  animation-delay: 0.8s;
}
.wave:nth-child(10) {
  animation-delay: 0.9s;
}

@keyframes wave {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
} */
