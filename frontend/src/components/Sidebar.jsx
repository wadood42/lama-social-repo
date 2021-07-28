import React from "react";
import {
  MdRssFeed,
  MdChat,
  MdVideoLibrary,
  MdGroup,
  MdBookmark,
  MdQuestionAnswer,
  MdEvent,
} from "react-icons/md";
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-wrapper'>
        <ul className='sidebar-list'>
          <li className='sidebar-item'>
            <MdRssFeed size={22} />
            <span>Feed</span>
          </li>

          <li className='sidebar-item'>
            <MdChat size={22} />
            <span>Chat</span>
          </li>

          <li className='sidebar-item'>
            <MdVideoLibrary size={22} />
            <span>Video</span>
          </li>

          <li className='sidebar-item'>
            <MdGroup size={22} />
            <span>Group</span>
          </li>
          <li className='sidebar-item'>
            <MdBookmark size={22} />
            <span>Bookmarks</span>
          </li>

          <li className='sidebar-item'>
            <MdQuestionAnswer size={22} />
            <span>Questions</span>
          </li>
          <li className='sidebar-item'>
            <MdEvent size={22} />
            <span>Events</span>
          </li>
        </ul>
        <button className='sidebar-btn'>Show More</button>
        <hr className='sidebar-hr' />
      </div>
    </div>
  );
};

export default Sidebar;
