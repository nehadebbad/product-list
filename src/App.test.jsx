import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: 'Laptop',
            price: 999.99,
            description: 'A high-performance laptop.',
            imageUrl: 'https://via.placeholder.com/200',
          },
        ]),
    })
  );
});

afterAll(() => {
  vi.restoreAllMocks();
});

test('renders product list header', async () => {
  render(<App />);
  expect(screen.getByText(/Product List/i)).toBeInTheDocument();

  // Wait for the product to appear
  await waitFor(() => {
    const laptops = screen.getAllByText(/Laptop/i);
    expect(laptops.length).toBeGreaterThan(0);
  }
  );
});
