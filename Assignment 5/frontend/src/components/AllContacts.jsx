
import { Link } from "react-router-dom";
import { useState } from "react";
import IndividualContact from "./IndividualContact";
import { useContacts } from "../contexts/ContactsContext";

export default function AllContacts() {
  const { contacts, filter, setFilter, setSearchTerm } = useContacts();
  const [inputValue, setInputValue] = useState("");

  return (
    <main className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-title">
                <div className="d-flex align-items-center justify-content-between">
                  <h2>All Contacts</h2>

                  <div className="input-group w-50">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="search contact"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                      className="btn btn-success"
                      type="button"
                      id="button-addon2"
                      onClick={() => setSearchTerm(inputValue)}
                    >
                      Search
                    </button>
                  </div>

                  <div>
                    <Link to="/create" className="btn btn-success">
                      <i className="fa fa-plus-circle"></i> Add New
                    </Link>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between p-3">
                <div className="fs-2">
                  <i className="fa fa-filter text-success"></i> Filter
                </div>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="1">First Name (A → Z)</option>
                  <option value="2">Last Name (A → Z)</option>
                  <option value="3">Oldest To First</option>
                </select>
              </div>

              <div className="card-body">
                {contacts.length === 0 ? (
                  <div className="text-center py-5">
                    <h4 className="text-muted">No contacts available</h4>
                  </div>
                ) : (
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {contacts.map((contact, index) => (
                        <IndividualContact
                          key={contact.id}
                          contact={contact}
                          index={index + 1}
                        />
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
