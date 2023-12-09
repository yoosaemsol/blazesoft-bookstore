import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';

import { add, edit, IBook } from 'store/store';
import { flexbox } from 'styles/utils';
import { Button } from './ui';
import { ImagePreloader } from 'components/DetailModal';
import { useNavigate } from 'react-router';

interface BookFromProps {
  book?: IBook;
  onClose?: () => void;
  finishEditMode?: () => void;
}

interface IBookSubmit {
  title: string;
  category: string;
  price: string;
  description: string;
  coverURL?: string;
}

export default function BookForm({
  book,
  onClose,
  finishEditMode,
}: BookFromProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBookSubmit>({
    mode: 'onSubmit',
    defaultValues: { ...book },
  });

  const enterdTitle = useWatch({ control, name: 'title' });
  const enteredURL = useWatch({ control, name: 'coverURL' });

  const onSubmit: SubmitHandler<IBookSubmit> = (data: IBookSubmit) => {
    if (book) {
      dispatch(
        edit({
          id: book.id,
          title: data.title,
          category: data.category,
          price: data.price.toString(),
          description: data.description,
          coverURL: data?.coverURL,
        })
      );

      finishEditMode && finishEditMode();
    }

    if (!book) {
      const id = Date.now();

      dispatch(
        add({
          id,
          title: data.title,
          category: data.category,
          price: data.price.toString(),
          description: data.description,
          coverURL: data?.coverURL,
        })
      );

      onClose && onClose();
      navigate(`/${id}`);
    }
  };

  return (
    <BookFormComponent>
      <ModalTitle>{book ? 'Modify Book' : 'New Book'}</ModalTitle>
      <Layout>
        <form>
          <FormBlock>
            <Label htmlFor="title">Title *</Label>
            <Input
              type="text"
              id="title"
              required
              $isError={!!errors?.title}
              {...register('title', { required: true })}
            />
            {errors?.title && <Error>Please provide a title</Error>}
          </FormBlock>
          <FormBlock>
            <Label htmlFor="category">Category *</Label>
            <Input
              type="text"
              id="category"
              required
              $isError={!!errors?.category}
              {...register('category', { required: true })}
            />
            {errors?.category && <Error>Please provide a category</Error>}
          </FormBlock>
          <FormBlock>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              required
              $isError={!!errors?.description}
              {...register('description', { required: true })}
            />
            {errors?.description && <Error>Please provide a description</Error>}
          </FormBlock>
          <FormBlock>
            <Label htmlFor="price">Price *</Label>
            <Input
              type="number"
              id="price"
              required
              $isError={!!errors?.price}
              {...register('price', { required: true })}
            />
            {errors?.price && <Error>Please provide a price</Error>}
          </FormBlock>
          <FormBlock>
            <Label htmlFor="coverURL">Book cover Image URL</Label>
            <Input
              type="text"
              id="coverURL"
              required
              {...register('coverURL', { required: false })}
            />
          </FormBlock>
        </form>
        <div>
          <ImagePreloader
            title={enterdTitle || ''}
            coverURL={enteredURL || ''}
          />
        </div>
      </Layout>
      <Footer>
        <Button size="large" variant="accent" onClick={handleSubmit(onSubmit)}>
          {book ? 'Save' : 'Add'}
        </Button>
        <Button
          size="large"
          layoutVariant="outlined"
          onClick={() => {
            onClose && onClose();
          }}
        >
          Close
        </Button>
      </Footer>
    </BookFormComponent>
  );
}

const BookFormComponent = styled.div`
  position: relative;
  height: 100%;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Layout = styled.div`
  ${flexbox('space-between', 'flex-start')}

  form {
    width: 100%;
  }
`;

const FormBlock = styled.section`
  ${flexbox('flex-start', 'flex-start')};
  flex-direction: column;
  padding: 10px 0px;
  width: 90%;
`;

const Label = styled.label`
  font-size: 13px;
  margin-bottom: 6px;
  font-weight: 500;
`;

const Input = styled.input<{ $isError?: boolean }>`
  width: 100%;
  border: 1px solid var(--color-light-level2);

  padding: 10px;
  border-radius: 7px;
  outline: none;

  ${({ $isError }) =>
    $isError &&
    `
   border-color: var(--color-accent);
  }
  `}
`;

const Textarea = styled.textarea<{ $isError?: boolean }>`
  width: 100%;
  height: 5em;
  padding: 10px;
  border: 1px solid var(--color-light-level2);
  border-radius: 7px;
  outline: none;
  resize: none;

  ${({ $isError }) =>
    $isError &&
    `
   border-color: var(--color-accent);
  }
  `}
`;

const Error = styled.span`
  color: var(--color-accent);
  font-size: 14px;
  font-weight: 500;
  padding-top: 4px;
`;

const Footer = styled.div`
  ${flexbox()};
  gap: 10px;
  position: absolute;
  bottom: -37px;
  width: 100%;
`;
