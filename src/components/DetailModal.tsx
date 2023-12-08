import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

import { IBook, RootState } from 'store/store';

import { Label, Modal, Button } from './ui';
import { flexbox } from 'styles/utils';

interface CoverImgProps {
  $imageUrl: string;
}

export default function DetailModal() {
  const [modal, setModal] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const booklist = useSelector((state: RootState) => state.booklist);

  useEffect(() => {
    id && setModal(id);
  }, [id]);

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
        <div>{!!coverURL && <CoverImg $imageUrl={coverURL} />}</div>
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
