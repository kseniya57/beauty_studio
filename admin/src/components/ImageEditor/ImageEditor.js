import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import {ModalContainer} from "@/components/Modals/styled";
import { Button, Flex } from '@/elements';
import Cropper  from 'cropperjs';

const ImageContainer = styled.div`
  max-height: 80vh;
`

function ImageEditor({ src, isRounded, width, height, onDone, close }) {

    const imageRef = useRef(null);
    const cropper = useRef(null);

    useEffect(() => {
        if (imageRef.current) {
            cropper.current = new Cropper(imageRef.current, {
                aspectRatio: width / height,
                viewMode: isRounded ? 1 : 0,
            });
            return () => {
                cropper.current.destroy();
            }
        }
    }, [imageRef.current]);

    const handleDone = useCallback(() => {
        const canvas = cropper.current.getCroppedCanvas({
            width,
            height,
        });
        canvas.toBlob(function (blob) {
            onDone(blob, canvas.toDataURL());
            close();
        });
    }, [cropper.current]);

    return (
        <ModalContainer>
            <ImageContainer className={isRounded && 'rounded-cropper'}>
                <img src={src} alt="" ref={imageRef}/>
            </ImageContainer>
            <Flex jcc aic mt="2rem">
                <Button color="primary" onClick={handleDone}>Ок</Button>
            </Flex>
        </ModalContainer>
    );
}

ImageEditor.defaultProps = {
    width: 160,
    height: 160,
    isRounded: false
}

export default ImageEditor;