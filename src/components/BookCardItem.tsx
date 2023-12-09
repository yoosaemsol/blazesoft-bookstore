import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { RiDeleteBin2Fill } from 'react-icons/ri';

import { IBook, remove } from 'store/store';
import { Label } from './ui';
import { flexbox } from 'styles/utils';
import { stringToColor } from 'common/utils/stringToColor';
import { extractTitleAndFormat } from 'common/utils/extractTitleAndFormat';
import { useImageLoading } from 'common/hooks/useImageLoading';

interface BookListItemProps {
  book: IBook;
}

interface CoverImgProps {
  $imageUrl: string;
}

export default function BookCardItem({ book }: BookListItemProps) {
  const { id, title, price, category, coverURL = '' } = book;

  const { isCoverLoading, isCoverAvailable } = useImageLoading(coverURL);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBookClick = (id: number) => {
    navigate(`/${id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );

    if (shouldDelete) {
      dispatch(remove(id));
    }
  };

  return (
    <BookCardItemComponent onClick={() => handleBookClick(id)}>
      {!isCoverLoading && isCoverAvailable && <CoverImg $imageUrl={coverURL} />}
      {!isCoverLoading && !isCoverAvailable && (
        <CoverText $bg={stringToColor(title)}>
          <div>{extractTitleAndFormat(title)}</div>
        </CoverText>
      )}
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

    overflow: hidden;
    white-space: nowrap;
    width: 200px;
    text-align: center;
    text-overflow: ellipsis;
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

const CoverText = styled.div<{ $bg: string }>`
  ${flexbox()};
  width: 210px;
  height: 310px;
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

const CoverImg = styled.div<CoverImgProps>`
  width: 210px;
  height: 310px;
  border-radius: 10px;
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
`;

export const DeleteButton = styled.button`
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
