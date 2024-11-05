import { RM_DialogProps } from "@/types";
import {
  Root,
  Overlay,
  Title,
  Content,
  Description,
  Close,
  Portal,
} from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import styles from "@/styles/dialog.module.css";

const RM_Dialog = ({
  children,
  title,
  description,
  open,
  onOpenChange,
}: RM_DialogProps) => (
  <Root open={open} onOpenChange={onOpenChange}>
    <Portal>
      <Overlay className={styles.DialogOverlay} />
      <Content className={styles.DialogContent}>
        <Title className={styles.DialogTitle}>{title}</Title>
        <Description className={styles.DialogDescription}>
          {description}
        </Description>
        {children}
        <Close asChild>
          <button className={styles.IconButton} aria-label="Close">
            <Cross2Icon />
          </button>
        </Close>
      </Content>
    </Portal>
  </Root>
);

export default RM_Dialog;
