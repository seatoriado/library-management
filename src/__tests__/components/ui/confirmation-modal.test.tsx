import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

interface ModalProps {
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmAction?: () => void;
  cancelAction?: () => void;
}

let confirmActionFlag: boolean;
let cancelActionFlag: boolean;

let confirmationModalProps: ModalProps;

describe("Confirmation Modal UI", () => {
  beforeEach(() => {
    confirmActionFlag = false;
    cancelActionFlag = false;
    confirmationModalProps = {
      title: "Title",
      message: "Message",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
      confirmAction: () => {
        confirmActionFlag = true;
      },
      cancelAction: () => {
        cancelActionFlag = true;
      },
    };
  });
  it("renders with complete details", async () => {
    render(<ConfirmationModal {...confirmationModalProps} />);

    const title = screen.queryAllByText("Title");
    const message = screen.queryAllByText("Message");
    const confirmLabel = screen.queryAllByText("Confirm");
    const cancelLabel = screen.queryAllByText("Cancel");

    expect(title.length).toBe(1);
    expect(message.length).toBe(1);
    expect(confirmLabel.length).toBe(1);
    expect(cancelLabel.length).toBe(1);
  });
  it("triggers confirm action when confirm button clicked", async () => {
    render(<ConfirmationModal {...confirmationModalProps} />);

    const confirmLabel = screen.queryByText("Confirm");

    if (confirmLabel) {
      await act(() => {
        fireEvent.click(confirmLabel, {});
      });
      expect(confirmActionFlag).toBe(true);
      expect(cancelActionFlag).toBe(false);
    } else {
      expect("Confirm button should have rendere").toBeFalsy();
    }
  });
  it("triggers cancel action when cancel button clicked", async () => {
    render(<ConfirmationModal {...confirmationModalProps} />);

    const cancelLabel = screen.queryByText("Cancel");

    if (cancelLabel) {
      await act(() => {
        fireEvent.click(cancelLabel, {});
      });
      expect(confirmActionFlag).toBe(false);
      expect(cancelActionFlag).toBe(true);
    } else {
      expect("Confirm button should have rendere").toBeFalsy();
    }
  });
});
