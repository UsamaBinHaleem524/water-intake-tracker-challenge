import { render, screen, fireEvent } from '@testing-library/react';
import LogPage from '../page';

describe('LogPage', () => {
  it('renders form and updates input values', async () => {
    render(<LogPage />);

    const dateInput = screen.getByLabelText('Date');
    const intakeInput = screen.getByLabelText('Intake (ml)');
    const submitButton = screen.getByText('Log Intake');

    // Simulate user input
    fireEvent.change(dateInput, { target: { value: '2025-08-06' } });
    fireEvent.change(intakeInput, { target: { value: '1500' } });

    // Verify input values
    expect(dateInput).toHaveValue('2025-08-06');
    expect(intakeInput).toHaveValue('1500');
    expect(submitButton).toBeInTheDocument();
  });
});