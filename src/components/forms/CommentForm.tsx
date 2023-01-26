import {CommentFormActions, CommentFormContent} from "../../styled/components/forms/CommentFormContent";

const CommentForm = () => {
  return (
    <CommentFormContent>
      <form>
        <textarea placeholder={"Add a comment..."} id="comment" />
      </form>
      <CommentFormActions>
        <button>Cancel</button>
        <button>Add</button>
      </CommentFormActions>
    </CommentFormContent>
  );
};

export default CommentForm;
