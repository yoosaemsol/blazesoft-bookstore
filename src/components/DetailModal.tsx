import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

import { IBook, RootState } from 'store/store';

import { Label, Modal, Button } from './ui';
import { flexbox } from 'styles/utils';
import { stringToColor } from 'common/utils/stringToColor';
import { extractTitleAndFormat } from 'common/utils/extractTitleAndFormat';

interface CoverImgProps {
  $imageUrl: string;
}

const ImagePreloader = ({ coverURL, title }: any) => {
  const [isLoaded, setIsLoaded] = useState<boolean | null>(null);

  useEffect(() => {
    if (!coverURL || coverURL?.length === 0) {
      setIsLoaded(false);
      return;
    }

    const img = new Image();

    img.onload = () => {
      setIsLoaded(true);
    };

    img.onerror = () => {
      setIsLoaded(false);
    };

    img.src = coverURL;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [coverURL]);

  if (isLoaded === true) {
    return <CoverImg $imageUrl={coverURL} />;
  }

  if (isLoaded === false) {
    return (
      <CoverText $bg={stringToColor(title)}>
        <div>{extractTitleAndFormat(title)}</div>
      </CoverText>
    );
  }

  return <></>;
};

export default function DetailModal() {
  const [modal, setModal] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const booklist = useSelector((state: RootState) => state.booklist);

  useEffect(() => {
    const book = booklist.find((book) => book.id === Number(id)) as IBook;

    if (id && book) {
      id && setModal(id);
    } else {
      navigate(`/`);
    }
  }, [id, navigate, booklist]);

  if (!modal) {
    return null;
  }

  const book = booklist.find((book) => book.id === Number(id)) as IBook;

  const { title, description, category, price, coverURL } = book;

  const handleCloseModal = () => {
    setModal(null);
    navigate(`/`);
  };

  return (
    <Modal onClose={handleCloseModal}>
      <DetailComponent>
        <div>
          <h3>{title}</h3>
          <Label>{category}</Label>
          <Description
            dangerouslySetInnerHTML={{
              __html: description.replace(/\n/g, '<br>'),
            }}
          />
          <p className="price">{`$ ${price}`}</p>
        </div>
        {/* <div>{!!coverURL && <CoverImg $imageUrl={coverURL} />}</div> */}
        <div>
          <ImagePreloader coverURL={coverURL} title={title} />
        </div>
      </DetailComponent>
      <Footer>
        <Button size="large">Modify</Button>
        <Button
          size="large"
          layoutVariant="outlined"
          onClick={handleCloseModal}
        >
          Close
        </Button>
      </Footer>
    </Modal>
  );
}

const Footer = styled.div`
  ${flexbox()};
  gap: 10px;
`;

const DetailComponent = styled.section`
  ${flexbox('space-between', 'flex-start')};
  height: 100%;
  gap: 20px;

  & > div:nth-child(1) {
    height: 100%;

    h3 {
      font-size: 20px;
      font-weight: 800;
      margin-top: 16px;
      margin-bottom: 15px;
    }

    p.price {
      color: var(--color-primary);
      font-size: 18px;
      font-weight: 800;
    }
  }
`;

const Description = styled.p`
  overflow: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  font-size: 15px;
  line-height: 1.6;
  margin: 20px 0px 30px 0px;
  max-height: 70%;
  font-weight: 600;
`;

const CoverImg = styled.div<CoverImgProps>`
  width: 161px;
  height: 226px;
  border-radius: 10px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
  transform: translateY(20px);
`;

const CoverText = styled.div<{ $bg: string }>`
  ${flexbox()};
  width: 161px;
  height: 226px;
  border-radius: 10px;
  background-color: ${(props) => stringToColor(props.$bg)};

  & > div {
    width: 110px;
    height: 110px;
    text-align: center;
    line-height: 100px;
    border: 2px solid #000000;
    border-radius: 50%;
    font-size: 40px;
    font-weight: 800;
  }
`;
