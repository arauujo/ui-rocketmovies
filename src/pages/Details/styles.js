import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  > main {
    padding: 32px 0;
  }
`;

export const Content = styled.div`
  margin: 0 auto;
  padding-right: 16px;
  max-width: 85vw;
  max-height: 70vw;
  display: flex;
  flex-direction: column;
  overflow: auto;

  > .buttons {
    display: flex;
    justify-content: space-between;

    button:first-child {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    button:last-child {
      width: auto;
    }
  }

  svg {
    color: ${({ theme }) => theme.COLORS.PINK};
    font-size: 20px;
  }

  > header {
    margin-top: 24px;
    display: flex;
    align-items: center;
    gap: 19px;

    h1 {
      font-size: 36px;
      font-weight: 500;
    }

    .ratings {
      display: flex;
      gap: 10px;
    }
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 24px;
    font-family: 'Roboto', sans-serif;

    img {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
  }

  section {
    margin-top: 40px;
  }

  > section span {
    color: ${({ theme }) => theme.COLORS.GRAY_050};
  }

  > p {
    font-size: 16px;
    margin-top: 40px;
    text-align: justify;
  }
`;
