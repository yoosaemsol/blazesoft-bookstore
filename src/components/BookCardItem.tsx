import styled from 'styled-components';

import { RiDeleteBin2Fill } from 'react-icons/ri';
import { Label } from './ui';
import { flexbox } from 'styles/utils';

export interface IBook {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  coverURL?: string;
}

interface BookListItemProps {
  book: IBook;
}

interface CoverImgProps {
  $imageUrl: string;
}

export default function BookCardItem({ book }: BookListItemProps) {
  const { id, title, price, category, coverURL = '' } = book;

  const handleBookClick = (id: number) => {};

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <BookCardItemComponent onClick={() => handleBookClick(id)}>
      {!!coverURL && <CoverImg $imageUrl={coverURL} />}
      <h3>{title}</h3>
      <Label>{category}</Label>
      <p>{`$ ${price}`}</p>
      <DeleteButton onClick={handleDeleteClick}>
        <RiDeleteBin2Fill />
      </DeleteButton>
    </BookCardItemComponent>
  );
}

const BookCardItemComponent = styled.li`
  ${flexbox('flex-start', 'center')};
  flex-direction: column;
  border: 2px solid var(--color-light-level1);
  padding: 20px 18px;
  border-radius: 9px;
  background-color: var(--color-light-level0);
  position: relative;

  h3 {
    font-size: 18px;
    font-weight: 700;
    margin-top: 16px;
    margin-bottom: 10px;
  }

  p {
    font-size: 15px;
    font-weight: 700;
    margin-top: 14px;
    color: var(--color-primary);
  }

  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:hover button {
    opacity: 1;
  }
`;

const CoverImg = styled.div<CoverImgProps>`
  width: 210px;
  height: 310px;
  border-radius: 10px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  opacity: 0;
  padding: 6px 6px 4px 6px;
  border: none;
  border-radius: 3px;
  background-color: var(--color-accent);
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;

  svg {
    font-size: 24px;
    color: var(--color-light-level0);
  }
`;
