import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { LoadingState } from '../../redux/reducers/loadingIndicator';
import LoadingIndicator from '../LoadingIndicator';

Enzyme.configure({ adapter: new Adapter() });

const expectSpinnerToShow = (
  component: Enzyme.ShallowWrapper,
  showing: boolean
) => {
  expect(component.find('.fa.fa-spinner.fa-spin').exists()).toBe(showing);
};

test('LoadingIndicator renders initial state', () => {
  const component = Enzyme.shallow(
    <LoadingIndicator loadingState={LoadingState.INITIAL} errorMessage="" />
  );
  expectSpinnerToShow(component, false);
  expect(component).toMatchSnapshot();
});

test('LoadingIndicator renders loading state', () => {
  const component = Enzyme.shallow(
    <LoadingIndicator loadingState={LoadingState.LOADING} errorMessage="" />
  );
  expect(component).toMatchSnapshot();
  expectSpinnerToShow(component, true);
});

test('LoadingIndicator renders error state', () => {
  const expectedErrorMessage = 'Some Error Message';
  const component = Enzyme.shallow(
    <LoadingIndicator
      loadingState={LoadingState.ERROR}
      errorMessage={expectedErrorMessage}
    />
  );
  expect(component).toMatchSnapshot();
  expectSpinnerToShow(component, false);
  expect(component.find(Alert).exists()).toBe(true);
});

test('LoadingIndicator renders completed state', () => {
  const component = Enzyme.shallow(
    <LoadingIndicator loadingState={LoadingState.COMPLETED} errorMessage="" />
  );
  expectSpinnerToShow(component, false);
  expect(component).toMatchSnapshot();
});
