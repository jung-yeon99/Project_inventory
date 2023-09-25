import {SetStateAction, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
interface ISlotItem {
    id: number;
    age: number;
    name: string;
    gender: string;
    dropId: string;
}

interface ISlotList {
    userItems: ISlotItem[];
}

const Input = styled.input`
    padding: 10px;
    width: 200px;
    height: 40px;
`;

const AgeInput = styled.input.attrs({
    type: "number",
})`
    padding: 10px;
    width: 200px;
    heigth: 40px;
`;

const GenderButton = styled.button`
    padding: 10px;
    width: 100px;
    height: 30px;
`;

const SubmitButton = styled.button`
    width: 100px;
    heigth: 50px;
    padding: 10px;
    text-align: center;
`;

function App() {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const arr = ["before", "after"];
    const [userItem, setUserItem] = useState<ISlotItem>({
        id: 0,
        name: "",
        age: 0,
        gender: "",
        dropId: arr[0],
    });

    const [userList, setUserList] = useState<ISlotList>({
        userItems: [userItem],
    });

    const getItemStyle = (isDragging: any, draggableStyle: any) => ({
        userSelect: "none",
        padding: 10,
        margin: `5 0`,
        border: "1px solid #ccc",
        background: isDragging ? "lightgreen" : "red",
        ...draggableStyle,
    });

    const onUserList = useCallback(() => {
        setUserList({
            userItems: [...userList.userItems, userItem],
        });
    }, [userItem]);

    useEffect(() => {
        onUserList();
    }, [onUserList]);

    // eslint-disable-next-line prefer-const
    let [idCnt, setIdCnt] = useState(0);

    const createUser = (name: string, age: number, gender: string) => {
        if (!name || age < 1 || !gender) {
            alert("사용자 정보 입력필요");
            return;
        }
        setIdCnt((idCnt += 1));
        setUserItem({id: idCnt, name, age, gender, dropId: "before"});
    };

    const resultUserDatas: any = (dropId: string) => {
        return userList?.userItems.map((user, idx) => {
            if (user.dropId === dropId && user.name)
                return (
                    <Draggable
                        draggableId={user.id.toString()}
                        index={idx}
                        key={user.id}
                    >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps} //draggableProps 드래그 할 수있는 상태 만들어줌
                                {...provided.dragHandleProps} // dragHandleProps 드래그 할 수있는 영역 만들어줌
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}
                            >
                                <span>{user.name}</span>
                                <span>{user.age}</span>
                                <span>{user.gender}</span>
                            </div>
                        )}
                    </Draggable>
                );
        });
    };

    const onDragEnd = (result: any) => {
        console.log(result);
        // dropped outside the list(리스트 밖으로 드랍한 경우)
        if (!result.destination) {
            return;
        }
        const {source, destination} = result;

        let items = [...userList.userItems];
        let index;
        if (source.droppableId !== destination.droppableId) {
            index = items.findIndex(
                (v) => v.id === parseInt(result.draggableId)
            );
            const findObj = items[index];
            findObj.dropId = destination.droppableId;
            items.splice(index, 1);
            items = [...items, findObj];
            setUserList({
                userItems: items,
            });
        } else {
            if (source.index !== destination.index) {
                const selectItem = items[result.source.index];
                items.splice(result.source.index, 1);
                items.splice(destination.index, 0, selectItem);
                setUserList({
                    userItems: items,
                });
            }
        }
    };

    const getListStyle = (isDraggingOver: any) => ({
        background: isDraggingOver ? "lightblue" : "grey",
        padding: 10,
        width: 250,
    });

    return (
        <>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Input
                        onChange={(e: {
                            target: {value: SetStateAction<string>};
                        }) => setName(e.target.value)}
                    />
                    <AgeInput
                        onChange={(e: {target: {value: string}}) =>
                            setAge(parseInt(e.target.value))
                        }
                    />
                    <GenderButton onClick={() => setGender("남자")}>
                        남자
                    </GenderButton>
                    <GenderButton onClick={() => setGender("여자")}>
                        여자
                    </GenderButton>
                    <SubmitButton onClick={() => createUser(name, age, gender)}>
                        사용자 등록
                    </SubmitButton>
                </div>
                <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
                    {arr.map((v) => {
                        return (
                            <>
                                <Droppable droppableId={v} key={v}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            key={v}
                                            ref={provided.innerRef}
                                            style={getListStyle(
                                                snapshot.isDraggingOver
                                            )}
                                            className={v}
                                        >
                                            {resultUserDatas(v)}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                <div
                                    style={{backgroundColor: "red", width: 100}}
                                ></div>
                            </>
                        );
                    })}
                </DragDropContext>
            </div>
        </>
    );
}

export default App;
