import { useState } from 'react';
import styled from 'styled-components';
import { BsList } from 'react-icons/bs';
import { MdOutlineGridView } from 'react-icons/md';

import BookCardItem from 'components/BookCardItem';
import { Button, Page } from 'components/ui';
import { flexbox } from 'styles/utils';
import initialBookList from 'mock/initialBookList.json';

export default function Home() {
  const [viewType, setViewType] = useState<'card' | 'list'>('card');

  const handleViewTypeChange = (type: 'card' | 'list') => {
    setViewType(type);
  };

  const handleAddBookClick = () => {
    // Add logic for adding a book
    console.log('clicked');
  };

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
      <BooksContainer $viewType={viewType}>
        {initialBookList?.map((book) =>
          viewType === 'card' ? (
            <BookCardItem key={book.id} book={book} />
          ) : (
            <div>{book.title}</div>
          )
        )}
      </BooksContainer>
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

const BooksContainer = styled.ul<{ $viewType: 'card' | 'list' }>`
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
