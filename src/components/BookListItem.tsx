import styled from 'styled-components';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router';

import { DeleteButton } from './BookCardItem';
import { IBook } from 'store/store';

import { Label } from './ui';
import { flexbox } from 'styles/utils';

interface BookListItemProps {
  book: IBook;
}

interface CoverImgProps {
  $imageUrl: string;
}

export default function BookListItem({ book }: BookListItemProps) {
  const { id, title, price, category, description, coverURL = '' } = book;
  const navigate = useNavigate();

  const handleBookClick = (id: number) => {
    navigate(`/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <BookListItemComponent onClick={() => handleBookClick(id)}>
      <div>{!!coverURL && <CoverImg $imageUrl={coverURL} />}</div>
      <div>
        <h3>{title}</h3>
        <Label>{category}</Label>
        <Description>{description}</Description>
        <p className="price">{`$ ${price}`}</p>
      </div>
      <DeleteButton onClick={handleDeleteClick}>
        <RiDeleteBin2Fill />
      </DeleteButton>
    </BookListItemComponent>
  );
}

const BookListItemComponent = styled.li`
  ${flexbox('flex-start', 'flex-start')};
  gap: 40px;
  border: 2px solid var(--color-light-level1);
  padding: 20px 23px;
  border-radius: 9px;
  background-color: var(--color-light-level0);
  position: relative;

  & > div:nth-child(2) {
    flex-direction: column;
    ${flexbox('flex-start', 'flex-start')};
    position: relative;
    height: 100%;

    h3 {
      font-size: 20px;
      font-weight: 800;
      margin-top: 16px;
      margin-bottom: 10px;
    }

    p {
      font-weight: 700;
      margin-top: 14px;
    }

    p.price {
      color: var(--color-primary);
      font-size: 16px;
      position: absolute;
      bottom: 10px;
    }
  }

  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:hover button {
    opacity: 1;
  }
`;

const Description = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  font-size: 14px;
`;

const CoverImg = styled.div<CoverImgProps>`
  width: 161px;
  height: 226px;
  border-radius: 10px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
`;
