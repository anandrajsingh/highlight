const CONTAINER_ID = 'highlight-feedback-container';
const FORM_CONTAINER_ID = 'highlight-form-container';

export interface FeedbackWidgetOptions {
    title?: string;
    subTitle?: string;
    submitButtonLabel?: string;
    enabled?: boolean;
}

export const initializeFeedbackWidget = (options: FeedbackWidgetOptions) => {
    const {
        subTitle = 'We appreciate your feedback!',
        submitButtonLabel = 'Send Feedback',
        title = 'Got Feedback?',
    } = options;
    const container = createContainer(CONTAINER_ID);
    const formContainer = createFormContainer(FORM_CONTAINER_ID);

    const headerContainer = document.createElement('div');
    const formTitle = createFormTitle(title);
    const formSubTitle = createFormSubTitle(subTitle);
    [formTitle, formSubTitle].forEach((element) => {
        headerContainer.appendChild(element);
    });

    const nameInput = createInput('text', 'Ada Lovelace');
    const emailInput = createInput('email', 'ada@lovelace.org');
    const verbatimInput = createTextArea();

    const onToggleFeedbackFormVisibility = () => {
        if (document.body.querySelector(`#${FORM_CONTAINER_ID}`)) {
            container.removeChild(formContainer);
        } else {
            container.appendChild(formContainer);

            const { userName, userEmail } = getUserDataFromIdentify();

            if (userName) {
                nameInput.value = userName;
            }

            if (userEmail) {
                emailInput.value = userEmail;
            }
        }
    };

    const form = createFormElement((e) => {
        e.preventDefault();
        // @ts-expect-error
        if (window?.H?.addSessionFeedback) {
            // @ts-expect-error
            window.H.addSessionFeedback({
                verbatim: verbatimInput.value,
                userEmail: emailInput.value,
                userName: nameInput.value,
            });
        }
        onToggleFeedbackFormVisibility();
    }, onToggleFeedbackFormVisibility);

    const submitButton = createSubmitButton(submitButtonLabel);

    [
        headerContainer,
        nameInput,
        emailInput,
        verbatimInput,
        submitButton,
    ].forEach((element) => {
        form.appendChild(element);
    });
    formContainer.appendChild(form);

    const launcherButton = createLauncherButton(onToggleFeedbackFormVisibility);

    container.appendChild(launcherButton);

    document.body.appendChild(container);

    return { onToggleFeedbackFormVisibility };
};

const applyInputStyles = (element: HTMLElement) => {
    element.style.setProperty('border', '0');
    element.style.setProperty('border-radius', '8px');
    element.style.setProperty('font-size', '14px');
    element.style.setProperty('padding', '16px');
    element.style.setProperty('width', '100%');
    element.style.setProperty('background-color', '#f2f2f2');
    element.style.setProperty('color', '#111111');
    element.style.setProperty('outline', 'none');
};

const applyButtonStyles = (element: HTMLElement) => {
    element.style.setProperty('align-items', 'center');
    element.style.setProperty('display', 'flex');
    element.style.setProperty('justify-content', 'center');
    element.style.setProperty('min-height', '40px');
    element.style.setProperty('height', 'auto');
    element.style.setProperty('padding-bottom', '8px');
    element.style.setProperty('padding-top', '8px');
    element.style.setProperty('color', 'white');
    element.style.setProperty('background', '#5629c6');
    element.style.setProperty('text-shadow', 'none');
    element.style.setProperty('box-shadow', 'none');
    element.style.setProperty('padding', '4px 16px');
    element.style.setProperty('font-size', '14px');
    element.style.setProperty('border-radius', '8px');
    element.style.setProperty('border', '0');
    element.style.setProperty('cursor', 'pointer');
};

const createFormElement = (
    onSubmitHandler: (e: any) => void,
    onCloseHandler: () => void
) => {
    const form = document.createElement('form');

    form.style.setProperty('position', 'fixed');
    form.style.setProperty('transform', 'translate(-50%, -50%)');
    form.style.setProperty('top', '50%');
    form.style.setProperty('left', '50%');
    form.style.setProperty('background', 'white');
    form.style.setProperty('width', '400px');
    form.style.setProperty(
        'box-shadow',
        '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)'
    );
    form.style.setProperty('padding', '32px');
    form.style.setProperty('padding-top', '24px');
    form.style.setProperty('border-radius', '8px');
    form.style.setProperty('border', '1px solid #eaeaea');
    form.style.setProperty('display', 'flex');
    form.style.setProperty('flex-direction', 'column');
    form.style.setProperty('row-gap', '24px');

    form.addEventListener('submit', onSubmitHandler);

    const closeButton = createCloseButton(onCloseHandler);

    form.appendChild(closeButton);

    return form;
};

const createCloseButton = (onCloseHandler: () => void) => {
    const closeButton = document.createElement('button');
    closeButton.style.setProperty('border', '0');
    closeButton.style.setProperty('background', 'none');
    closeButton.style.setProperty('height', '32px');
    closeButton.style.setProperty('width', '32px');
    closeButton.style.setProperty('position', 'absolute');
    closeButton.style.setProperty('top', '8px');
    closeButton.style.setProperty('right', '12px');
    closeButton.style.setProperty('cursor', 'pointer');
    closeButton.style.setProperty('padding', '0');
    closeButton.style.setProperty('display', 'flex');
    closeButton.style.setProperty('align-items', 'center');
    closeButton.style.setProperty('justify-content', 'center');
    closeButton.innerHTML = `<svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
  </svg>
  `;

    closeButton.addEventListener('click', onCloseHandler);

    return closeButton;
};

const createInput = (type: string, placeholder: string) => {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    applyInputStyles(input);

    return input;
};

const createTextArea = () => {
    const textArea = document.createElement('textarea');
    applyInputStyles(textArea);

    return textArea;
};

const createSubmitButton = (label: string) => {
    const submitButton = document.createElement('input');
    applyButtonStyles(submitButton);
    submitButton.type = 'submit';
    submitButton.value = label;

    return submitButton;
};

const createFormTitle = (label: string) => {
    const formTitle = document.createElement('h1');
    formTitle.innerText = label;
    formTitle.style.setProperty('font-size', '24px');
    formTitle.style.setProperty('margin', '0');

    return formTitle;
};

const createFormSubTitle = (label: string) => {
    const formTitle = document.createElement('h2');
    formTitle.innerText = label;
    formTitle.style.setProperty('font-size', '16px');
    formTitle.style.setProperty('margin', '0 !important');
    formTitle.style.setProperty('margin-top', '8px', 'important');
    formTitle.style.setProperty('font-weight', '400');
    formTitle.style.setProperty('color', '#828282', 'important');

    return formTitle;
};

const createContainer = (id: string) => {
    const container = document.createElement('div');
    container.id = id;
    container.style.setProperty('position', 'fixed');
    container.style.setProperty('z-index', '2147483001');
    container.style.setProperty('bottom', '20px');
    container.style.setProperty('right', '20px');
    container.style.setProperty(
        'font-family',
        "'Steradian', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"
    );

    return container;
};

const createFormContainer = (id: string) => {
    const formContainer = document.createElement('div');
    formContainer.id = id;

    return formContainer;
};

const createLauncherButton = (onClickHandler: () => void) => {
    const button = document.createElement('button');
    button.style.setProperty('border', '0');
    button.style.setProperty('height', '60px');
    button.style.setProperty('width', '60px');
    button.style.setProperty('border-radius', '50%');
    button.style.setProperty(
        'background',
        'linear-gradient(180deg, #5629C6 0%, #321873 100%)'
    );
    button.style.setProperty(
        'box-shadow',
        '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)'
    );
    button.style.setProperty('cursor', 'pointer');
    button.style.setProperty('padding', '17px');
    button.addEventListener('click', onClickHandler);
    button.innerHTML = `<svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg" style="height: 100%; width: 100%;">
    <path d="M18.8448 1.78645L8.82205 1.81786C4.82839 1.83038 1.60104 5.07803 1.61356 9.07168L1.81847 74.4451C1.83099 78.4388 5.07864 81.6661 9.07229 81.6536L45.4291 81.5396L18.8448 1.78645Z" fill="white"/>
    <path d="M64.987 81.4783L37.0749 1.72931L74.1955 1.61295C78.1891 1.60043 81.4368 4.82778 81.4493 8.82144L81.6542 74.1949C81.6667 78.1885 78.4394 81.4362 74.4457 81.4487L64.987 81.4783Z" fill="white"/>
    </svg>`;

    return button;
};

const getUserDataFromIdentify = () => {
    let userName = '';
    let userEmail = '';

    const identifierFromSessionStorage = window.sessionStorage.getItem(
        'highlightIdentifier'
    );

    if (
        identifierFromSessionStorage &&
        identifierFromSessionStorage.includes('@')
    ) {
        userEmail = identifierFromSessionStorage;
    }

    const userObjectFromSessionStorage = window.sessionStorage.getItem(
        'highlightUserObject'
    );
    if (userObjectFromSessionStorage) {
        try {
            const parsedUserObject = JSON.parse(userObjectFromSessionStorage);
            const parsedUserName =
                parsedUserObject['name'] || parsedUserObject['Name'];
            const parsedUserEmail =
                parsedUserObject['email'] || parsedUserObject['Email'];

            if (parsedUserName) {
                userName = parsedUserName;
            }
            if (parsedUserEmail) {
                userEmail = parsedUserEmail;
            }
        } catch {
            // no-op
        }
    }

    return { userName, userEmail };
};
