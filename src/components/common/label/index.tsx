import { FC } from 'react';
import style from './style.module.scss';

interface ILabelProps {
    htmlFor: string;
    labelText: string;
    requiredField?: boolean;
    customClass?: string;
}

export const Label: FC<ILabelProps> = (props) => {
    const { htmlFor, labelText, requiredField = false, customClass } = props;
    return (
        <label htmlFor={htmlFor} className={[style.labelWrapper, customClass].join(' ')}>
            {labelText}
            {requiredField &&
                <span className={style.requiredField}>*</span>
            }
        </label>
    )
}