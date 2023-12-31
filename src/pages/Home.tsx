import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import { BsList } from 'react-icons/bs';
import { MdOutlineGridView } from 'react-icons/md';

import BookCardItem from 'components/BookCardItem';
import { Button, LoadingSpinner, Modal, Page } from 'components/ui';
import { flexbox } from 'styles/utils';
import initialBookList from 'mock/initialBookList.json';
import BookListItem from 'components/BookListItem';
import { IBook, init, loadState, RootState } from 'store/store';
import DetailModal from 'components/DetailModal';
import BookForm from 'components/BookForm';
import { loadViewType, saveViewType } from 'common/utils/viewTypeStorageUtils';

type viewType = 'card' | 'list' | undefined;

export default function Home() {
  const [viewType, setViewType] = useState<viewType>(undefined);
  const [onAddForm, setOnAddForm] = useState(false);

  const booklist = useSelector((state: RootState) => state.booklist);
  const dispatch = useDispatch();

  const handleViewTypeChange = (type: viewType) => {
    saveViewType(type);
    setViewType(type);
  };

  const handleAddBookClick = () => {
    setOnAddForm(true);
  };

  useEffect(() => {
    const loadedData = loadState();
    const loadedViewType = loadViewType();

    dispatch(init(loadedData ? loadedData : initialBookList));
    setViewType(loadedViewType || 'card');
  }, [dispatch]);

  if (!viewType) {
    return <LoadingSpinner size="50px" />;
  }

  return (
    <Page>
      <Title>Books</Title>
      <ControlsContainer>
        <ViewTypeIcons>
          <BsList
            className={`icon ${viewType === 'list' ? 'active' : ''}`}
            onClick={() => handleViewTypeChange('list')}
          />
          <MdOutlineGridView
            className={`icon ${viewType === 'card' ? 'active' : ''}`}
            onClick={() => handleViewTypeChange('card')}
          />
        </ViewTypeIcons>
        <Button onClick={handleAddBookClick}>ADD BOOK</Button>
      </ControlsContainer>
      {!!viewType && (
        <BooksContainer $viewType={viewType}>
          {booklist?.map((book: IBook) =>
            viewType === 'card' ? (
              <BookCardItem key={book.id} book={book} />
            ) : (
              <BookListItem key={book.id} book={book} />
            )
          )}
        </BooksContainer>
      )}
      <DetailModal />
      {onAddForm && (
        <Modal onClose={() => setOnAddForm(false)}>
          <BookForm onClose={() => setOnAddForm(false)} />
        </Modal>
      )}
    </Page>
  );
}

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const ViewTypeIcons = styled.div`
  ${flexbox()};
  gap: 10px;

  .icon {
    font-size: 22px;
    color: var(--color-light-level2);
    cursor: pointer;
  }

  .icon.active {
    color: var(--color-primary);
  }
`;

const ControlsContainer = styled.div`
  ${flexbox('flex-end', 'center')};
  gap: 20px;
  width: 100%;
  margin: 16px 0px 10px 0px;
  padding: 10px;
  border: 2px solid var(--color-light-level1);
  border-radius: 5px;
`;

const BooksContainer = styled.ul<{ $viewType: viewType }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  ${({ $viewType }) =>
    $viewType === 'card' &&
    `
    @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
  `}

  ${({ $viewType }) =>
    $viewType === 'list' &&
    `
    grid-template-columns: repeat(1, 1fr);
  `}
`;
